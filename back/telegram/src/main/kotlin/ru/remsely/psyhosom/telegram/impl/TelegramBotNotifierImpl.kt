package ru.remsely.psyhosom.telegram.impl

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton
import org.telegram.telegrambots.meta.bots.AbsSender
import ru.remsely.psyhosom.domain.consultation.Consultation
import ru.remsely.psyhosom.domain.schedule.Schedule
import ru.remsely.psyhosom.telegram.BotMessageSender
import ru.remsely.psyhosom.telegram.callback.Callback
import ru.remsely.psyhosom.usecase.telegram.NotificationEvent
import ru.remsely.psyhosom.usecase.telegram.TelegramBotNotifier
import java.time.LocalDate
import java.time.format.DateTimeFormatter

private val timeFormatter = DateTimeFormatter.ofPattern("HH:mm")
private val dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy")

@Component
class TelegramBotNotifierImpl(
    @Value("\${frontend.url}")
    private val frontendUrl: String,

    private val absSender: AbsSender,

    private val botMessageSender: BotMessageSender,
) : TelegramBotNotifier {
    override fun notify(event: NotificationEvent) = when (event) {
        is NotificationEvent.ConsultationCreated -> sendCreation(event.consultation)
        is NotificationEvent.ConsultationCancelled -> sendCancel(event.consultation)
        is NotificationEvent.ConsultationRejected -> sendReject(event.consultation)
        is NotificationEvent.ConsultationConfirmed -> sendConfirmation(event.consultation)
        is NotificationEvent.ConsultationNotified -> sendComingNotification(event.consultation)
        is NotificationEvent.ConsultationFinished -> sendFinishedNotification(event.consultation)
    }

    private fun sendCreation(c: Consultation) {
        val patientText = """
            🎉 <b>Ваша заявка на консультацию создана!</b>
            Мы сообщим вам, как только психолог подтвердит запись.
        """.trimIndent()

        val patientKeyboard = InlineKeyboardMarkup().apply {
            keyboard = listOf(
                listOf(
                    InlineKeyboardButton().apply {
                        text = "🚫 Отменить запись"
                        callbackData = "/${Callback.CANCEL_CONSULTATION.value} ${c.id}"
                    }
                )
            )
        }

        val psychologistText = """
            🆕 <b>Новая заявка на консультацию.</b>

            👤 Пациент: <i>${c.patient.firstName}</i>
            📅 Дата: <code>${c.scheduleSlot.date.readable}</code>
            ⏰ Время: <code>${c.scheduleSlot.readableTimePeriod}</code>
        """.trimIndent() + if (c.problemDescription != null) {
            "\n\uD83D\uDCDD Описание проблемы: <i>${c.problemDescription}</i>"
        } else {
            ""
        }

        val psychologistKeyboard = InlineKeyboardMarkup().apply {
            keyboard = listOf(
                listOf(
                    InlineKeyboardButton().apply {
                        text = "✅ Принять"
                        callbackData = "/${Callback.CONFIRM_CONSULTATION.value} ${c.id}"
                    }
                ),
                listOf(
                    InlineKeyboardButton().apply {
                        text = "❌ Отклонить"
                        callbackData = "/${Callback.REJECT_CONSULTATION.value} ${c.id}"
                    }
                )
            )
        }

        absSender.execute(
            botMessageSender.sendMessageWithInlineButtons(
                chatId = c.patient.account.tgChatId,
                text = patientText,
                keyboard = patientKeyboard,
            )
        )

        absSender.execute(
            botMessageSender.sendMessageWithInlineButtons(
                chatId = c.psychologist.account.tgChatId,
                text = psychologistText,
                keyboard = psychologistKeyboard,
            )
        )
    }

    private fun sendCancel(c: Consultation) {
        val patientText = """
            ❌ <b>Запись отменена.</b>
            До новых встреч!
        """.trimIndent()

        val psychologistText = """
            ⚠️ <b>${c.patient.firstName} отменил(-а) консультацию.</b>

            📅 ${c.scheduleSlot.date.readable}, ⏰ ${c.scheduleSlot.readableTimePeriod} — эта встреча больше не состоится.
        """.trimIndent()

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.patient.account.tgChatId,
                text = patientText,
            )
        )

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.psychologist.account.tgChatId,
                text = psychologistText,
            )
        )
    }

    private fun sendReject(c: Consultation) {
        val patientText = """
            😔 <b>${c.psychologist.firstName} отклонил(-а) вашу заявку</b>
    
            Попробуйте выбрать другое время или специалиста.
        """.trimIndent()

        val psychologistText = """
            ❌ <b>Заявка отклонена.</b>
        """.trimIndent()

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.patient.account.tgChatId,
                text = patientText,
            )
        )

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.psychologist.account.tgChatId,
                text = psychologistText,
            )
        )
    }

    private fun sendConfirmation(c: Consultation) {
        val patientText = """
            🎉 <b>${c.psychologist.firstName} принял(-а) вашу заявку.</b>

            📅 ${c.scheduleSlot.date.readable} ⏰ ${c.scheduleSlot.readableTimePeriod}
            Мы отправим вам ссылку для присоединения к звонку перед консультацией.
        """.trimIndent()

        val psychologistText = """
            ✅ <b>Консультация подтверждена.</b>
            Мы отправим вам ссылку для присоединения к звонку перед консультацией.
        """.trimIndent()

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.patient.account.tgChatId,
                text = patientText,
            )
        )

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.psychologist.account.tgChatId,
                text = psychologistText,
            )
        )
    }

    private fun sendComingNotification(c: Consultation) {
        val meetingLink = c.meetingLink?.value ?: absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.psychologist.account.tgChatId,
                text = "⚠️ <b>Ошибка при создании встречи. Обратитесь в службу поддержки!</b>",
            )
        )

        val patientText = """
            📣 <b>Напоминание о консультации.</b>
            
            🗓 Дата: ${c.scheduleSlot.date.readable}
            ⏰ Время: ${c.scheduleSlot.readableTimePeriod}
            
            👤 Специалист: ${c.psychologist.firstName} ${c.psychologist.lastName}
            
            💻 Присоединиться к звонку: $meetingLink
        """.trimIndent()

        val psychologistText = """
            ⏰ <b>Скоро консультация.</b>
            
            🗓 Дата: ${c.scheduleSlot.date.readable}
            ⏰ Время: ${c.scheduleSlot.readableTimePeriod}
            
            👤 Пациент: ${c.patient.firstName} ${c.patient.lastName}
            
            💻 Присоединиться к звонку: $meetingLink
        """.trimIndent()

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.patient.account.tgChatId,
                text = patientText,
            )
        )

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.psychologist.account.tgChatId,
                text = psychologistText,
            )
        )
    }

    fun sendFinishedNotification(c: Consultation) {
        val patientText = """
            ✅ <b>Консультация завершена!</b>

            Спасибо, что выбрали нас. Мы будем рады получить от вас обратную связь.
            Отзыв о специалисте можно оставить по ссылке: $frontendUrl/${c.psychologist.id}?section=reviews.
        """.trimIndent()

        absSender.execute(
            botMessageSender.sendMessage(
                chatId = c.patient.account.tgChatId,
                text = patientText,
            )
        )
    }
}

private val LocalDate.readable: String
    get() = this.format(dateFormatter)

private val Schedule.Slot.readableTimePeriod: String
    get() = "${this.startTm.format(timeFormatter)}-${this.endTm.format(timeFormatter)}"

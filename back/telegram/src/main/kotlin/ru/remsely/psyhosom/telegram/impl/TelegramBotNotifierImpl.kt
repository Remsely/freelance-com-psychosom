package ru.remsely.psyhosom.telegram.impl

import org.springframework.stereotype.Component
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton
import ru.remsely.psyhosom.domain.consultation.Consultation
import ru.remsely.psyhosom.domain.value_object.TelegramChatId
import ru.remsely.psyhosom.telegram.PsychosomBot
import ru.remsely.psyhosom.telegram.command.Command
import ru.remsely.psyhosom.usecase.telegram.TelegramBotNotifier
import java.time.format.DateTimeFormatter


private val timeFormatter = DateTimeFormatter.ofPattern("HH:mm")
private val dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy")

@Component
class TelegramBotNotifierImpl(
    private val psychosomBot: PsychosomBot
) : TelegramBotNotifier {
    override fun sendStartConsultationNotifierToPatient(chatId: TelegramChatId, consultation: Consultation) {
        val cancelCommand = "/${Command.CANCEL_CONSULTATION.value} ${consultation.id}"

        val keyboardMarkup = InlineKeyboardMarkup().apply {
            keyboard = listOf(
                listOf(
                    InlineKeyboardButton().apply {
                        text = "Отменить запись"
                        callbackData = cancelCommand
                    }
                )
            )
        }

        val message = """
            Запись на консультацию создана. Мы уведомим вас, когда запись будет подтверждена психологом.
        """.trimIndent()

        psychosomBot.sendMessageWithKeyboard(chatId, message, keyboardMarkup)
    }

    override fun sendStartConsultationNotifierToPsychologist(chatId: TelegramChatId, consultation: Consultation) {
        val confirmCommand = "/${Command.CONFIRM_CONSULTATION.value} ${consultation.id}"
        val rejectCommand = "/${Command.REJECT_CONSULTATION.value} ${consultation.id}"

        val keyboardMarkup = InlineKeyboardMarkup().apply {
            keyboard = listOf(
                listOf(
                    InlineKeyboardButton().apply {
                        text = "Принять запись"
                        callbackData = confirmCommand
                    }
                ),
                listOf(
                    InlineKeyboardButton().apply {
                        text = "Отклонить запись"
                        callbackData = rejectCommand
                    }
                )
            )
        }

        val message = """
            *Новая заявка на консультацию*
            
            ${consultation.patient.firstName} хочет записаться к вам на прием `${consultation.period.readableStartDate} на ${consultation.period.readableTimePeriod}`.
        """.trimIndent()

        psychosomBot.sendMessageWithKeyboard(chatId, message, keyboardMarkup)
    }
}

val Consultation.Period.readableStartDate: String
    get() = this.start.format(dateFormatter)

val Consultation.Period.readableTimePeriod: String
    get() = "${this.start.format(timeFormatter)}-${this.end.format(timeFormatter)}"

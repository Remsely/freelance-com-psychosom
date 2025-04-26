package ru.remsely.psyhosom.usecase.telegram

import ru.remsely.psyhosom.domain.consultation.Consultation
import ru.remsely.psyhosom.domain.value_object.TelegramChatId

interface TelegramBotNotifier {
    fun sendStartConsultationNotifierToPatient(chatId: TelegramChatId, consultation: Consultation)

    fun sendStartConsultationNotifierToPsychologist(chatId: TelegramChatId, consultation: Consultation)
}

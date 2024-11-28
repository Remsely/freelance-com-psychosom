package ru.remsely.psyhosom.usecase.telegram

import ru.remsely.psyhosom.domain.value_object.TelegramBotToken

interface TelegramBotConfirmation {
    fun getTelegramConfirmationUri(token: TelegramBotToken): String
}

package ru.remsely.psyhosom.telegram

import org.springframework.stereotype.Component
import ru.remsely.psyhosom.domain.value_object.TelegramBotToken
import ru.remsely.psyhosom.telegram.properties.TelegramBotEndpoints
import ru.remsely.psyhosom.usecase.telegram.TelegramBotConfirmation

@Component
class TelegramBotConfirmationImpl(
    private val telegramBotEndpoints: TelegramBotEndpoints
) : TelegramBotConfirmation {
    override fun getTelegramConfirmationUri(token: TelegramBotToken): String =
        "${telegramBotEndpoints.confirmation}${token.value}"
}

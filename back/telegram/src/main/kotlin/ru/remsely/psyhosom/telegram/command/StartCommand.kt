package ru.remsely.psyhosom.telegram.command

import arrow.core.getOrElse
import arrow.core.raise.either
import org.springframework.stereotype.Component
import org.telegram.telegrambots.extensions.bots.commandbot.commands.BotCommand
import org.telegram.telegrambots.meta.api.objects.Chat
import org.telegram.telegrambots.meta.api.objects.User
import org.telegram.telegrambots.meta.bots.AbsSender
import ru.remsely.psyhosom.domain.value_object.TelegramBotToken
import ru.remsely.psyhosom.domain.value_object.TelegramChatId
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.telegram.BotMessageSender
import ru.remsely.psyhosom.usecase.auth.AccountConfirmationError
import ru.remsely.psyhosom.usecase.auth.ConfirmAccountCommand
import ru.remsely.psyhosom.usecase.auth.WebSocketAccountConfirmationNotifier

@Component
open class StartCommand(
    private val botMessageSender: BotMessageSender,
    private val confirmAccountCommand: ConfirmAccountCommand,
    private val accountConfirmationNotifier: WebSocketAccountConfirmationNotifier
) : BotCommand(
    Command.START.value, "Начать"
) {
    private val log = logger()

    override fun execute(absSender: AbsSender, user: User, chat: Chat, args: Array<out String>?) {
        log.info("Command ${Command.START.value} was executed in chat ${chat.id} with args: $args")

        if (args.isNullOrEmpty() || args.size != 1) {
            sendWrongFormatError(absSender, chat)
            return
        }

        val token = args[0]

        either {
            confirmAccountCommand.execute(
                token = TelegramBotToken(token).bind(),
                chatId = TelegramChatId(chat.id.toString()).bind()
            ).bind()
        }.fold(
            {
                if (it is AccountConfirmationError.ConfirmationAttemptIsOutdated) {
                    sendOutdatedError(absSender, chat)
                } else {
                    sendUnknownError(absSender, chat)
                }
                log.warn("Error while executing command ${Command.START.value} in chat ${chat.id} with args: $args.")
            },
            {
                log.info("Command ${Command.START.value} successfully executed in chat ${chat.id} with args: $args.")

                runCatching {
                    accountConfirmationNotifier.sendNotification(
                        token = TelegramBotToken(token).getOrElse { throw RuntimeException("Invalid token.") },
                        status = WebSocketAccountConfirmationNotifier.Status.CONFIRMED
                    )
                }

                absSender.execute(
                    botMessageSender.sendMessage(
                        chat.id.toString(),
                        "Аккаунт подтвержден!"
                    )
                )
            }
        )
    }

    private fun sendUnknownError(absSender: AbsSender, chat: Chat) {
        absSender.execute(
            botMessageSender.sendMessage(
                chat.id.toString(),
                "При выполнении команды произошла ошибка. Попробуйте позже."
            )
        )
    }

    private fun sendWrongFormatError(absSender: AbsSender, chat: Chat) {
        absSender.execute(
            botMessageSender.sendMessage(
                chat.id.toString(),
                "При выполнении команды ${Command.START.value} произошла ошибка. " +
                        "Убедитесь, что вы переходили по ссылке, указанной на сайте."
            )
        )
    }

    private fun sendOutdatedError(absSender: AbsSender, chat: Chat) {
        absSender.execute(
            botMessageSender.sendMessage(
                chat.id.toString(),
                "Время подтверждения аккаунта вышло. Попробуйте зарегистрироваться снова."
            )
        )
    }
}

package ru.remsely.psyhosom.api.web_socket

import org.springframework.stereotype.Component
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import ru.remsely.psyhosom.domain.value_object.TelegramBotToken
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.auth.WebSocketAccountConfirmationNotifier
import java.util.concurrent.ConcurrentHashMap

@Component
class WebSocketSessionManager : WebSocketAccountConfirmationNotifier {
    private val log = logger()

    private val sessions = ConcurrentHashMap<String, WebSocketSession>()

    fun addSession(token: TelegramBotToken, session: WebSocketSession) {
        sessions[token.value] = session
    }

    fun removeSession(token: TelegramBotToken) {
        sessions.remove(token.value)
    }

    override fun sendNotification(token: TelegramBotToken, status: WebSocketAccountConfirmationNotifier.Status) {
        val jsonMessage = """{"token": "${token.value}", "status": "$status"}"""
        sessions[token.value]!!.sendMessage(TextMessage(jsonMessage))
        log.info("Notification for token ${token.value} successfully sent.")
    }
}

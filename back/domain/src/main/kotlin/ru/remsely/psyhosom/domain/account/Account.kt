package ru.remsely.psyhosom.domain.account

import ru.remsely.psyhosom.domain.value_object.TelegramBotToken

data class Account(
    val id: Long,
    val username: String,
    val password: String,
    val role: Role,
    val isConfirmed: Boolean,
    val tgBotToken: TelegramBotToken
) {
    enum class Role {
        ADMIN, PATIENT, PSYCHOLOGIST
    }
}

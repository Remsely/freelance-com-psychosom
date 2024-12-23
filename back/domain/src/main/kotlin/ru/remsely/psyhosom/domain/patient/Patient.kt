package ru.remsely.psyhosom.domain.patient

import ru.remsely.psyhosom.domain.account.Account
import ru.remsely.psyhosom.domain.value_object.PhoneNumber
import ru.remsely.psyhosom.domain.value_object.TelegramUsername

data class Patient(
    val id: Long,
    val account: Account,
    val phone: PhoneNumber?,
    val telegram: TelegramUsername?,
    val firstName: String?,
    val lastName: String?,
)

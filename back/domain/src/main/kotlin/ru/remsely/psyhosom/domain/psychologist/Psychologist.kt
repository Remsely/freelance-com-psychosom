package ru.remsely.psyhosom.domain.psychologist

import ru.remsely.psyhosom.domain.account.Account

data class Psychologist(
    val id: Long,
    val account: Account
)

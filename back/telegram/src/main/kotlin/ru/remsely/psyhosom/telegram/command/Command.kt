package ru.remsely.psyhosom.telegram.command

enum class Command(val value: String) {
    START("start"),
    CANCEL_CONSULTATION("cancel_consultation"),
    REJECT_CONSULTATION("reject_consultation"),
    CONFIRM_CONSULTATION("confirm_consultation"),
}

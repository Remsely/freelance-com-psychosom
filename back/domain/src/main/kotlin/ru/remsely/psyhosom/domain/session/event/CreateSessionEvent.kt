package ru.remsely.psyhosom.domain.session.event

data class CreateSessionEvent(
    val patientId: Long,
    val psychologistId: Long
)

package ru.remsely.psyhosom.api.response

import ru.remsely.psyhosom.domain.session.Session
import java.time.LocalDateTime

data class CreateSessionResponse(
    val id: Long,
    val psychologistId: Long,
    val patientId: Long,
    val status: Session.Status,
    val orderDate: LocalDateTime,
)

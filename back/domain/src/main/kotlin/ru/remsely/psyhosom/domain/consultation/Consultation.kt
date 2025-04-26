package ru.remsely.psyhosom.domain.consultation

import ru.remsely.psyhosom.domain.patient.Patient
import ru.remsely.psyhosom.domain.psychologist.Psychologist
import java.time.LocalDateTime

data class Consultation(
    val id: Long,
    val psychologist: Psychologist,
    val patient: Patient,
    val problemDescription: String?,
    val startDtTm: LocalDateTime,
    val endDtTm: LocalDateTime,
    val status: Status,
    val orderDtTm: LocalDateTime,
    val confirmationDtTm: LocalDateTime?,
) {
    enum class Status {
        PENDING,
        CONFIRMED,
        CANCELED,
        FINISHED
    }
}

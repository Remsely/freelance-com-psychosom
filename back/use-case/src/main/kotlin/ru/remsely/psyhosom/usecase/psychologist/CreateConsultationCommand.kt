package ru.remsely.psyhosom.usecase.psychologist

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.consultation.Consultation
import ru.remsely.psyhosom.domain.consultation.event.CreateConsultationEvent

interface CreateConsultationCommand {
    fun execute(event: CreateConsultationEvent): Either<DomainError, Consultation>
}

sealed class ConsultationCreationError(override val message: String) : DomainError.ValidationError {
    data class ActiveConsultationExist(
        private val psychologistId: Long,
        private val patientId: Long
    ) : ConsultationCreationError(
        "Patient $patientId already has an active consultation with psychologist $psychologistId."
    )
}

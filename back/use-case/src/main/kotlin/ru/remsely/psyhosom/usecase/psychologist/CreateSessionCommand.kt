package ru.remsely.psyhosom.usecase.psychologist

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.session.Session
import ru.remsely.psyhosom.domain.session.event.CreateSessionEvent

interface CreateSessionCommand {
    fun execute(event: CreateSessionEvent): Either<DomainError, Session>
}

sealed class SessionCreationError(override val message: String) : DomainError.ValidationError {
    data class ActiveSessionExist(
        private val psychologistId: Long,
        private val patientId: Long
    ) : SessionCreationError(
        "Patient $patientId already has an active session with psychologist $psychologistId."
    )
}

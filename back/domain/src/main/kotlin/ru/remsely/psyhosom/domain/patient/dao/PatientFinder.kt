package ru.remsely.psyhosom.domain.patient.dao

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.patient.Patient

interface PatientFinder {
    fun findPatientByUserId(userId: Long): Either<DomainError, Patient>

    fun checkNotExistsWithUsernameInContacts(username: String): Either<DomainError, Unit>
}

sealed class PatientFindingError(override val message: String) : DomainError.ValidationError {
    data class NotFoundByUserId(private val userId: Long) : PatientFindingError(
        "Profile for user with id $userId not found."
    )

    data object ProfileWithUsernameAlreadyExists : PatientFindingError(
        "Profile with such username already exists."
    )
}

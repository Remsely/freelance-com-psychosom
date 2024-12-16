package ru.remsely.psyhosom.usecase.profile

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.patient.Patient

interface FindPatientCommand {
    fun execute(userId: Long): Either<DomainError, Patient>
}

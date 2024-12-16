package ru.remsely.psyhosom.db.dao

import arrow.core.Either
import arrow.core.left
import arrow.core.raise.either
import arrow.core.raise.ensure
import arrow.core.right
import arrow.core.singleOrNone
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.remsely.psyhosom.db.extensions.toDomain
import ru.remsely.psyhosom.db.extensions.toEntity
import ru.remsely.psyhosom.db.repository.PatientRepository
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.patient.Patient
import ru.remsely.psyhosom.domain.patient.dao.*
import ru.remsely.psyhosom.monitoring.log.logger

@Component
open class PatientDao(
    private val patientRepository: PatientRepository
) : PatientCreator, PatientFinder, PatientUpdater, PatientEraser {
    private val log = logger()

    @Transactional
    override fun createPatient(patient: Patient): Either<DomainError, Patient> =
        patientRepository.save(patient.toEntity())
            .toDomain()
            .right()
            .also {
                log.info("Profile for user with id ${patient.account.id} successfully created in DB.")
            }

    @Transactional(readOnly = true)
    override fun findPatientByUserId(userId: Long): Either<DomainError, Patient> =
        patientRepository.findByAccountId(userId)
            .singleOrNone()
            .fold(
                { PatientFindingError.NotFoundByUserId(userId).left() },
                {
                    it.toDomain().right()
                        .also {
                            log.info("Profile for user with id $userId successfully found in DB.")
                        }
                }
            )

    @Transactional(readOnly = true)
    override fun checkNotExistsWithUsernameInContacts(username: String): Either<DomainError, Unit> =
        either {
            ensure(
                !patientRepository.existsByTelegramEqualsIgnoreCaseOrPhoneEqualsIgnoreCase(
                    username,
                    username
                )
            ) {
                PatientFindingError.ProfileWithUsernameAlreadyExists
            }
        }

    @Transactional
    override fun updatePatient(patient: Patient): Either<DomainError, Patient> =
        patientRepository.save(patient.toEntity())
            .toDomain()
            .right()
            .also {
                log.info("Profile for user with id ${patient.account.id} successfully updated in DB.")
            }

    @Transactional
    override fun erasePatientsByAccountIds(accountIds: List<Long>): Either<DomainError, Unit> =
        patientRepository.deleteByAccountIdIn(accountIds).right()
            .also {
                log.info("Profiles by id list wish size ${accountIds.size} successfully deleted from DB.")
            }
}

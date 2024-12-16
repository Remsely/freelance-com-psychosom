package ru.remsely.psyhosom.db.dao

import arrow.core.Either
import arrow.core.right
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.remsely.psyhosom.db.extensions.toDomain
import ru.remsely.psyhosom.db.extensions.toEntity
import ru.remsely.psyhosom.db.repository.ConsultationRepository
import ru.remsely.psyhosom.domain.consultation.Consultation
import ru.remsely.psyhosom.domain.consultation.dao.ConsultationCreator
import ru.remsely.psyhosom.domain.consultation.dao.ConsultationFinder
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.monitoring.log.logger

@Component
open class ConsultationDao(
    private val repository: ConsultationRepository
) : ConsultationCreator, ConsultationFinder {
    private val log = logger()

    @Transactional
    override fun createConsultation(consultation: Consultation): Either<DomainError, Consultation> =
        repository.save(consultation.toEntity())
            .toDomain()
            .right()
            .also {
                log.info("Session with id ${consultation.id} successfully created in DB.")
            }

    @Transactional(readOnly = true)
    override fun existActiveConsultationByPatientAndPsychologist(
        patientId: Long,
        psychologistId: Long
    ): Boolean = repository.existsSessionByPatientIdAndPsychologistIdAndStatusNotIn(
        patientId = patientId,
        psychologistId = psychologistId,
        statuses = listOf(Consultation.Status.FINISHED, Consultation.Status.CANCELED)
    )
}

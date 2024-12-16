package ru.remsely.psyhosom.db.dao

import arrow.core.Either
import arrow.core.right
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.remsely.psyhosom.db.extensions.toDomain
import ru.remsely.psyhosom.db.extensions.toEntity
import ru.remsely.psyhosom.db.repository.SessionRepository
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.session.Session
import ru.remsely.psyhosom.domain.session.dao.SessionCreator
import ru.remsely.psyhosom.domain.session.dao.SessionFinder
import ru.remsely.psyhosom.monitoring.log.logger

@Component
open class SessionDao(
    private val repository: SessionRepository
) : SessionCreator, SessionFinder {
    private val log = logger()

    @Transactional
    override fun createSession(session: Session): Either<DomainError, Session> =
        repository.save(session.toEntity())
            .toDomain()
            .right()
            .also {
                log.info("Session with id ${session.id} successfully created in DB.")
            }

    @Transactional(readOnly = true)
    override fun existActiveSessionByPatientAndPsychologist(
        patientId: Long,
        psychologistId: Long
    ): Boolean = repository.existsSessionByPatientIdAndPsychologistId(patientId, psychologistId)
}

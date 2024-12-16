package ru.remsely.psyhosom.usecase.psychologist

import arrow.core.Either
import arrow.core.raise.either
import arrow.core.raise.ensure
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.patient.dao.PatientFinder
import ru.remsely.psyhosom.domain.psychologist.dao.PsychologistFinder
import ru.remsely.psyhosom.domain.session.Session
import ru.remsely.psyhosom.domain.session.dao.SessionCreator
import ru.remsely.psyhosom.domain.session.dao.SessionFinder
import ru.remsely.psyhosom.domain.session.event.CreateSessionEvent
import ru.remsely.psyhosom.monitoring.log.logger
import java.time.LocalDateTime

@Component
open class CreateSessionCommandImpl(
    private val sessionCreator: SessionCreator,
    private val sessionFinder: SessionFinder,
    private val psychologistFinder: PsychologistFinder,
    private val patientFinder: PatientFinder
) : CreateSessionCommand {
    private val log = logger()

    @Transactional
    override fun execute(event: CreateSessionEvent): Either<DomainError, Session> = either {
        val patientId = event.patientId
        val psychologistId = event.psychologistId

        val psychologist = psychologistFinder.findPsychologistById(psychologistId).bind()

        ensure(!sessionFinder.existActiveSessionByPatientAndPsychologist(patientId, psychologistId)) {
            SessionCreationError.ActiveSessionExist(patientId, psychologistId)
        }

        val patient = patientFinder.findPatientById(patientId).bind()

        sessionCreator.createSession(
            Session(
                id = 0L,
                patient = patient,
                psychologist = psychologist,
                status = Session.Status.PENDING,
                orderDate = LocalDateTime.now(),
                confirmationDate = null,
                startDate = null
            )
        ).bind().also {
            log.info(
                "Session for patient with id $patientId and psychologist with id $psychologistId " +
                        "successfully created."
            )
        }
    }
}

package ru.remsely.psyhosom.usecase.consultation

import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Component
import ru.remsely.psyhosom.domain.consultation.dao.ConsultationFinder
import ru.remsely.psyhosom.domain.consultation.dao.ConsultationUpdater
import ru.remsely.psyhosom.domain.consultation.extensions.notifyConsultation
import ru.remsely.psyhosom.domain.value_object.MeetingLink
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.telegram.NotificationEvent

@Component
class NotifyComingConsultationsCommandImpl(
    private val consultationsFinder: ConsultationFinder,
    private val consultationsUpdater: ConsultationUpdater,
    private val eventPublisher: ApplicationEventPublisher
) : NotifyComingConsultationsCommand {
    private val log = logger()

    override fun execute() = consultationsFinder
        .findAllConfirmedConsultationsToNotify()
        .map {
            it.notifyConsultation(MeetingLink.generate())
        }
        .onEach { consultation ->
            eventPublisher.publishEvent(
                NotificationEvent.ConsultationNotified(consultation)
            )
        }
        .let {
            consultationsUpdater.updateConsultations(it)
            Unit
        }.also {
            log.info("Coming consultations successfully notified and updated.")
        }
}

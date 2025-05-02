package ru.remsely.psyhosom.scheduled

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.psychologist.UpdatePsychologistScheduleSlotsCommand

@Component
class PsychologistScheduleSlotsUpdater(
    private val command: UpdatePsychologistScheduleSlotsCommand
) {
    private val log = logger()

    @Scheduled(cron = "\${scheduled.psychologist-schedule-slots-addition.cron}")
    fun updateScheduleSlots() {
        log.info("Starting scheduled task to update psychologist schedule slots...")
        command.execute()
            .fold(
                {
                    log.warn("Scheduled slots updating failed.")
                },
                {
                    log.warn("Successfully updated psychologists schedule slots.")
                }
            )
    }
}

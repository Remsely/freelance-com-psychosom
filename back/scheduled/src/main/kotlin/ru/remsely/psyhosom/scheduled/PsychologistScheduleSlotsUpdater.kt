package ru.remsely.psyhosom.scheduled

import org.springframework.context.ApplicationListener
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.psychologist.UpdatePsychologistScheduleSlotsCommand

@Component
class PsychologistScheduleSlotsUpdater(
    private val command: UpdatePsychologistScheduleSlotsCommand
) : ApplicationListener<ContextRefreshedEvent> {
    private val log = logger()

    override fun onApplicationEvent(event: ContextRefreshedEvent) {
        doUpdate()
    }

    @Scheduled(cron = "\${scheduled.psychologist-schedule-slots-addition.cron}")
    fun updateScheduleSlots() {
        doUpdate()
    }

    private fun doUpdate() {
        command.execute().fold(
            {
                log.error("Updating schedule slots failed.")
            },
            {
                log.info("Successfully updated psychologists schedule slots.")
            }
        )
    }
}

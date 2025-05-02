package ru.remsely.psyhosom.domain.schedule.dao

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.schedule.Schedule

interface ScheduleSlotsCreator {
    fun createScheduleSlots(slots: List<Schedule.Slot>): Either<DomainError, Schedule.Slot>
}

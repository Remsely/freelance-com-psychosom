package ru.remsely.psyhosom.domain.schedule.dao

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.schedule.Schedule

interface ScheduleSlotsFinder {
    fun findLastScheduleSlots(): Either<DomainError, Schedule.Slot>
}

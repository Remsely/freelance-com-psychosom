package ru.remsely.psyhosom.domain.schedule.dao

import java.time.LocalDate

interface ScheduleSlotFinder {
    fun existsByDate(date: LocalDate): Boolean
}

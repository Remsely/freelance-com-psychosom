package ru.remsely.psyhosom.db.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.remsely.psyhosom.db.entity.ScheduleSlot
import java.time.LocalDate

@Repository
interface ScheduleSlotRepository : JpaRepository<ScheduleSlot, Long> {
    fun deleteByDateIsBefore(date: LocalDate): List<ScheduleSlot>
}

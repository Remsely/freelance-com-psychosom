package ru.remsely.psyhosom.db.repository

import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import ru.remsely.psyhosom.db.entity.ScheduleSlot
import java.time.LocalDate
import java.time.LocalTime

@Repository
interface ScheduleSlotRepository : JpaRepository<ScheduleSlot, Long> {
    fun existsByDate(date: LocalDate): Boolean

    @Modifying
    @Transactional
    @Query(
        """
        delete ScheduleSlot ss
        where ss.date < :date or (ss.date = :date and ss.startTm < :time)
        """
    )
    fun deleteByEndDtTmIsBefore(date: LocalDate, time: LocalTime): Int
}

package ru.remsely.psyhosom.db.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.remsely.psyhosom.db.entity.Session

interface SessionRepository : JpaRepository<Session, Long> {
    fun existsSessionByPatientIdAndPsychologistId(patientId: Long, psychologistId: Long): Boolean
}

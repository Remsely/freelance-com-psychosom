package ru.remsely.psyhosom.domain.session.dao

interface SessionFinder {
    fun existActiveSessionByPatientAndPsychologist(patientId: Long, psychologistId: Long): Boolean
}

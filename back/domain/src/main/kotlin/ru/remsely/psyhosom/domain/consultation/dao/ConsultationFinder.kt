package ru.remsely.psyhosom.domain.consultation.dao

interface ConsultationFinder {
    fun existActiveConsultationByPatientAndPsychologist(patientId: Long, psychologistId: Long): Boolean
}

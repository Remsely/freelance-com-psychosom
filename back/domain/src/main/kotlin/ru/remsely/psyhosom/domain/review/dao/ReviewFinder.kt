package ru.remsely.psyhosom.domain.review.dao

interface ReviewFinder {
    fun existReviewByPatientIdAndPsychologistId(patientId: Long, psychologistId: Long): Boolean
}

package ru.remsely.psyhosom.api.request

data class CreateReviewRequest(
    val psychologistId: Long,
    val rating: Int,
    val text: String,
)

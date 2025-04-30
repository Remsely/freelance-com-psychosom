package ru.remsely.psyhosom.api.dto.response

import io.swagger.v3.oas.annotations.media.Schema
import ru.remsely.psyhosom.api.dto.ArticleBlockDto

@Schema(description = "Информация о психологе")
data class PsychologistFullInfoResponse(
    val id: Long,
    val firstName: String,
    val lastName: String,
    val profileImage: String,
    val article: List<ArticleBlockDto>,
)

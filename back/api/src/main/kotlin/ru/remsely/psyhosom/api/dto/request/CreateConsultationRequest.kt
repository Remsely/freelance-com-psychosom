package ru.remsely.psyhosom.api.dto.request

import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDate
import java.time.LocalTime

@Schema(description = "Запрос на создание отзыва")
data class CreateConsultationRequest(
    @field:Schema(
        description = "Дата и время начала консультации",
        pattern = "dd-MM-yyyy",
        example = "25-12-2025"
    )
    val date: LocalDate,

    @field:Schema(
        description = "Дата и время начала консультации",
        pattern = "HH:mm:ss",
        example = "13:00:00"
    )
    val startTm: LocalTime,

    @field:Schema(
        description = "Дата и время окончания консультации",
        pattern = "HH:mm:ss",
        example = "14:00:00"
    )
    val endTm: LocalTime,

    @field:Schema(
        description = "Описание проблемы",
        example = "У меня проблемы со сном."
    )
    val problemDescription: String?,
)

package ru.remsely.psyhosom.api.controller.open_api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import ru.remsely.psyhosom.api.dto.ArticleBlockDto
import ru.remsely.psyhosom.api.dto.response.ErrorResponse
import ru.remsely.psyhosom.api.dto.response.PsychologistFullInfoResponse

@Tag(name = "Психологи", description = "Эндпоинты для оперирования данными психологов")
interface PsychologistControllerContract {
    @Operation(summary = "Публикация статьи психолога")
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Запись на консультацию прошла успешно",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = PsychologistFullInfoResponse::class)
                    )
                ]
            ),
            ApiResponse(
                responseCode = "400",
                description = "Некорректные входные данные",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = ErrorResponse::class)
                    )
                ]
            ),
            ApiResponse(
                responseCode = "401",
                description = "Неверные учетные данные",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = ErrorResponse::class)
                    )
                ]
            ),
            ApiResponse(
                responseCode = "500",
                description = "Внутренняя ошибка сервера",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = ErrorResponse::class)
                    )
                ]
            )
        ]
    )
    @SecurityRequirement(name = "bearerAuth")
    fun publishArticle(
        @Parameter(hidden = true)
        psychologistId: Long,

        @Schema(description = "Запрос на публикацию статьи")
        request: List<ArticleBlockDto>
    ): ResponseEntity<*>
}

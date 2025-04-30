package ru.remsely.psyhosom.api.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.remsely.psyhosom.api.controller.open_api.PsychologistControllerContract
import ru.remsely.psyhosom.api.dto.ArticleBlockDto
import ru.remsely.psyhosom.api.extensions.error_handling.toResponse
import ru.remsely.psyhosom.api.extensions.mapping.toDomain
import ru.remsely.psyhosom.api.extensions.mapping.toDto
import ru.remsely.psyhosom.api.utils.annotations.AuthPsychologistId
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.consultation.PublishArticleCommand

@RestController
@RequestMapping("/api/v1/psychologists")
class PsychologistController(
    private val publishArticleCommand: PublishArticleCommand
) : PsychologistControllerContract {
    private val log = logger()

    @PutMapping("/article")
    override fun publishArticle(
        @AuthPsychologistId psychologistId: Long,
        @RequestBody request: List<ArticleBlockDto>
    ): ResponseEntity<*> {
        log.info("POST /api/v1/psychologists/article | psychologistId: $psychologistId | request: $request")
        return publishArticleCommand.execute(
            psychologistId = psychologistId,
            article = request.toDomain()
        ).fold(
            { err ->
                err.toResponse()
                    .also { log.warn(err.message) }
            },
            {
                ResponseEntity.ok(it.toDto())
            }
        )
    }
}

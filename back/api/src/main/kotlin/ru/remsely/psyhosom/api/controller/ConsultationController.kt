package ru.remsely.psyhosom.api.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.remsely.psyhosom.api.request.CreateConsultationRequest
import ru.remsely.psyhosom.api.response.CreateConsultationResponse
import ru.remsely.psyhosom.api.response.ErrorResponse
import ru.remsely.psyhosom.api.utils.AuthPatientId
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.patient.dao.PatientFindingError
import ru.remsely.psyhosom.domain.psychologist.dao.PsychologistFindingError
import ru.remsely.psyhosom.domain.consultation.event.CreateConsultationEvent
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.psychologist.CreateConsultationCommand
import ru.remsely.psyhosom.usecase.psychologist.ConsultationCreationError
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/v1/consultations")
class ConsultationController(
    private val createConsultationCommand: CreateConsultationCommand
) {
    private val log = logger()

    @PostMapping
    fun createSession(@AuthPatientId patientId: Long, @RequestBody request: CreateConsultationRequest): ResponseEntity<*> {
        log.info("POST /api/v1/consultations | patientId: $patientId.")
        return createConsultationCommand.execute(
            CreateConsultationEvent(
                patientId = patientId,
                psychologistId = request.psychologistId
            )
        ).fold(
            { handleError(it) },
            {
                ResponseEntity
                    .ok()
                    .body(
                        CreateConsultationResponse(
                            id = it.id,
                            psychologistId = it.psychologist.id,
                            patientId = it.patient.id,
                            status = it.status,
                            orderDate = it.orderDate
                        )
                    )
            }
        )
    }

    private fun handleError(error: DomainError): ResponseEntity<ErrorResponse> =
        when (error) {
            is PatientFindingError.NotFoundById -> HttpStatus.NOT_FOUND
            is ConsultationCreationError.ActiveConsultationExist -> HttpStatus.BAD_REQUEST
            is PsychologistFindingError.NotFoundById -> HttpStatus.NOT_FOUND
            else -> HttpStatus.INTERNAL_SERVER_ERROR
        }.let {
            ResponseEntity
                .status(it)
                .body(
                    ErrorResponse(
                        message = error.message,
                        source = error.javaClass.name,
                        timestamp = LocalDateTime.now(),
                        status = it.name
                    )
                ).also {
                    log.warn(error.message)
                }
        }
}

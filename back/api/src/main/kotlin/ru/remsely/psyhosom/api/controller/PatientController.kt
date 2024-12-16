package ru.remsely.psyhosom.api.controller

import arrow.core.flatMap
import arrow.core.raise.either
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.remsely.psyhosom.api.request.UpdatePatientRequest
import ru.remsely.psyhosom.api.response.ErrorResponse
import ru.remsely.psyhosom.api.response.toResponse
import ru.remsely.psyhosom.api.utils.AuthAccountId
import ru.remsely.psyhosom.domain.account.dao.AccountFindingError
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.patient.dao.PatientFindingError
import ru.remsely.psyhosom.domain.patient.event.UpdatePatientEvent
import ru.remsely.psyhosom.domain.value_object.PhoneNumber
import ru.remsely.psyhosom.domain.value_object.PhoneNumberValidationError
import ru.remsely.psyhosom.domain.value_object.TelegramUsername
import ru.remsely.psyhosom.domain.value_object.TelegramUsernameValidationError
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.usecase.patient.FindPatientCommand
import ru.remsely.psyhosom.usecase.patient.PatientUpdateError
import ru.remsely.psyhosom.usecase.patient.UpdatePatientCommand
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/v1/patients")
class PatientController(
    private val updatePatientCommand: UpdatePatientCommand,
    private val findPatientCommand: FindPatientCommand
) {
    private val log = logger()

    @PutMapping
    fun updatePatient(@AuthAccountId accountId: Long, @RequestBody request: UpdatePatientRequest): ResponseEntity<*> {
        log.info("PUT /api/v1/patients | userId: $accountId.")
        return either {
            UpdatePatientEvent(
                accountId = accountId,
                firstName = request.firstName,
                lastName = request.lastName,
                phone = PhoneNumber(request.phone).bind(),
                telegram = TelegramUsername(request.telegram).bind()
            )
        }.flatMap {
            updatePatientCommand.execute(it)
        }.fold(
            { handleError(it) },
            {
                ResponseEntity
                    .ok()
                    .body(it.toResponse())
            }
        )
    }

    @GetMapping
    fun findPatient(@AuthAccountId accountId: Long): ResponseEntity<*> {
        log.info("GET /api/v1/patients | userId: $accountId.")
        return findPatientCommand.execute(accountId)
            .fold(
                { handleError(it) },
                {
                    ResponseEntity
                        .ok()
                        .body(it.toResponse())
                }
            )
    }

    private fun handleError(error: DomainError): ResponseEntity<ErrorResponse> =
        when (error) {
            is PhoneNumberValidationError.InvalidPhoneNumber -> HttpStatus.BAD_REQUEST
            is TelegramUsernameValidationError.InvalidTelegramUsername -> HttpStatus.BAD_REQUEST
            is PatientUpdateError.PatientUsernameMustBeInContacts -> HttpStatus.BAD_REQUEST
            is AccountFindingError.NotFoundById -> HttpStatus.NOT_FOUND
            is PatientFindingError.NotFoundByAccountId -> HttpStatus.NOT_FOUND
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
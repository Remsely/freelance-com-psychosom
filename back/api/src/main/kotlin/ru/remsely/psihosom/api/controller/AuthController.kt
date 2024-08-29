package ru.remsely.psihosom.api.controller

import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.remsely.psihosom.api.response.AuthResponse
import ru.remsely.psihosom.api.response.ErrorResponse
import ru.remsely.psihosom.domain.error.DomainError
import ru.remsely.psihosom.domain.extentions.logger
import ru.remsely.psihosom.domain.user.User
import ru.remsely.psihosom.domain.user.dao.UserCreationError
import ru.remsely.psihosom.usecase.auth.AuthService
import ru.remsely.psihosom.usecase.auth.UserLoginError
import ru.remsely.psihosom.usecase.auth.request.AuthRequest
import java.time.LocalDateTime

@RestController
@RequestMapping("/v1/auth/admin")
class AuthController(
    private val authService: AuthService
) {
    private val log = logger()

    @PostMapping("/register")
    fun register(@Valid @RequestBody request: AuthRequest): ResponseEntity<*> {
        log.info("POST /auth/register | AuthRequest: $request")
        return authService.registerUser(request, User.Role.ADMIN)
            .fold(
                { handleError(it) },
                {
                    ResponseEntity
                        .ok()
                        .body(AuthResponse(it))
                }
            )
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: AuthRequest): ResponseEntity<*> {
        log.info("POST /auth/login | AuthRequest: $request")
        return authService.loginUser(request)
            .fold(
                { handleError(it) },
                {
                    ResponseEntity
                        .ok()
                        .body(AuthResponse(it))
                }
            )
    }

    private fun handleError(error: DomainError): ResponseEntity<ErrorResponse> =
        when (error) {
            is UserCreationError.UserAlreadyExists -> HttpStatus.BAD_REQUEST
            is UserLoginError.AuthenticationError -> HttpStatus.UNAUTHORIZED
            else -> HttpStatus.INTERNAL_SERVER_ERROR
        }.let {
            ResponseEntity
                .status(it)
                .body(
                    ErrorResponse(
                        message = error.message,
                        timestamp = LocalDateTime.now(),
                        status = it.name
                    )
                )
        }
}

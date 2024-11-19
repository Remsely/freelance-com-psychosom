package ru.remsely.psyhosom.usecase.auth

import arrow.core.Either
import ru.remsely.psyhosom.domain.errors.DomainError
import ru.remsely.psyhosom.domain.user.User

interface AuthService {
    fun registerUser(user: User): Either<DomainError, String>

    fun loginUser(user: User): Either<DomainError, String>
}

sealed class UserLoginError(override val message: String) : DomainError.ValidationError {
    data class AuthenticationError(private val username: String) : UserLoginError(
        "Incorrect username or password."
    )
}

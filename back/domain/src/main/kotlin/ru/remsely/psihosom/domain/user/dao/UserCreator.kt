package ru.remsely.psihosom.domain.user.dao

import arrow.core.Either
import ru.remsely.psihosom.domain.error.DomainError
import ru.remsely.psihosom.domain.user.User

interface UserCreator {
    fun createUser(user: User): Either<DomainError, User>
}

sealed class UserCreationError(override val message: String) : DomainError.ValidationError {
    data class UserAlreadyExists(private val username: String) : UserCreationError(
        "User with username $username already exists"
    )
}

package ru.remsely.psihosom.domain.user.dao

import arrow.core.Either
import ru.remsely.psihosom.domain.error.DomainError
import ru.remsely.psihosom.domain.user.User

interface UserFinder {
    fun findUserByUsername(username: String): Either<DomainError, User>
}

sealed class UserFindingError(override val message: String) : DomainError.ValidationError {
    data class NotFound(private val username: String) : UserFindingError(
        "User with username $username not found."
    )
}

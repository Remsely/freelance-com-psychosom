package ru.remsely.psyhosom.domain.user.dao

import arrow.core.Either
import ru.remsely.psyhosom.domain.errors.DomainError
import ru.remsely.psyhosom.domain.user.User

interface ProfileFinder {
    fun findProfileByUserId(userId: Long): Either<DomainError, User.Profile>

    fun checkNotExistsWithUsernameInContacts(username: String): Either<DomainError, Unit>
}

sealed class UserProfileFindingError(override val message: String) : DomainError.ValidationError {
    data class NotFoundByUserId(private val userId: Long) : UserProfileFindingError(
        "Profile for user with id $userId not found."
    )

    data object ProfileWithUsernameAlreadyExists : UserProfileFindingError(
        "Profile with such username already exists."
    )
}

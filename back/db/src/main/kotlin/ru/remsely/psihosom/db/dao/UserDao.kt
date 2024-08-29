package ru.remsely.psihosom.db.dao

import arrow.core.Either
import arrow.core.raise.either
import arrow.core.raise.ensure
import org.springframework.stereotype.Component
import ru.remsely.psihosom.db.extensions.toDomain
import ru.remsely.psihosom.db.extensions.toEntity
import ru.remsely.psihosom.db.repository.UserRepository
import ru.remsely.psihosom.domain.error.DomainError
import ru.remsely.psihosom.domain.user.User
import ru.remsely.psihosom.domain.user.dao.UserCreationError
import ru.remsely.psihosom.domain.user.dao.UserCreator

@Component
class UserDao(
    private val userRepository: UserRepository
) : UserCreator {
    override fun createUser(user: User): Either<DomainError, User> = either {
        ensure(!userRepository.existsByUsername(user.username)) {
            UserCreationError.UserAlreadyExists(user.username)
        }
        userRepository.save(user.toEntity()).toDomain()
    }
}

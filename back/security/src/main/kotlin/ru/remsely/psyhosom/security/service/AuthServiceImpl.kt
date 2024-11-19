package ru.remsely.psyhosom.security.service

import arrow.core.Either
import arrow.core.flatMap
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.remsely.psyhosom.domain.errors.DomainError
import ru.remsely.psyhosom.domain.extentions.logger
import ru.remsely.psyhosom.domain.user.User
import ru.remsely.psyhosom.domain.user.dao.UserCreator
import ru.remsely.psyhosom.security.jwt.JwtTokenGenerator
import ru.remsely.psyhosom.usecase.auth.AuthService
import ru.remsely.psyhosom.usecase.auth.UserLoginError

@Service
open class AuthServiceImpl(
    private val userCreator: UserCreator,
    private val authManager: AuthenticationManager,
    private val tokenGenerator: JwtTokenGenerator,
    private val passwordEncoder: PasswordEncoder
) : AuthService {
    private val log = logger()

    @Transactional
    override fun registerUser(user: User): Either<DomainError, String> =
        userCreator.createUser(
            User(
                0L,
                user.username,
                passwordEncoder.encode(user.password),
                user.role
            )
        ).flatMap {
            loginUser(user)
        }.also {
            log.info("User with username ${user.username} successfully registered.")
        }

    override fun loginUser(user: User): Either<DomainError, String> = Either.catch {
        authManager.authenticate(
            UsernamePasswordAuthenticationToken(user.username, user.password)
        ).let { auth ->
            tokenGenerator.generate(auth)
        }.also {
            log.info("User with username ${user.username} successfully logged in.")
        }
    }.mapLeft {
        UserLoginError.AuthenticationError(user.username)
    }
}

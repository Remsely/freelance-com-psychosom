package ru.remsely.psyhosom.security.service

import arrow.core.Either
import arrow.core.raise.either
import arrow.core.raise.ensure
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.remsely.psyhosom.domain.account.Account
import ru.remsely.psyhosom.domain.account.dao.AccountCreator
import ru.remsely.psyhosom.domain.account.dao.ProfileFinder
import ru.remsely.psyhosom.domain.account.event.LoginAccountEvent
import ru.remsely.psyhosom.domain.account.event.RegisterAccountEvent
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.profile.Profile
import ru.remsely.psyhosom.domain.profile.dao.ProfileCreator
import ru.remsely.psyhosom.domain.value_object.PhoneNumber
import ru.remsely.psyhosom.domain.value_object.TelegramBotToken
import ru.remsely.psyhosom.domain.value_object.TelegramUsername
import ru.remsely.psyhosom.monitoring.log.logger
import ru.remsely.psyhosom.security.jwt.JwtTokenGenerator
import ru.remsely.psyhosom.usecase.auth.AuthService
import ru.remsely.psyhosom.usecase.auth.UserLoginError
import ru.remsely.psyhosom.usecase.auth.UserRegisterValidationError
import ru.remsely.psyhosom.usecase.telegram.TelegramBotConfirmation

@Service
open class AuthServiceImpl(
    private val accountCreator: AccountCreator,
    private val authManager: AuthenticationManager,
    private val tokenGenerator: JwtTokenGenerator,
    private val passwordEncoder: PasswordEncoder,
    private val profileCreator: ProfileCreator,
    private val profileFinder: ProfileFinder,
    private val telegramBotConfirmation: TelegramBotConfirmation
) : AuthService {
    private val log = logger()

    @Transactional
    override fun registerUser(event: RegisterAccountEvent): Either<DomainError, String> = either {
        ensure(
            !(PhoneNumber(event.username).getOrNone().isNone() &&
                    TelegramUsername(event.username).getOrNone().isNone())
        ) {
            UserRegisterValidationError.InvalidUsername
        }
        profileFinder.checkNotExistsWithUsernameInContacts(event.username).bind()
        accountCreator.createUser(
            Account(
                id = 0L,
                username = event.username,
                password = passwordEncoder.encode(event.password),
                role = event.role,
                isConfirmed = false,
                tgBotToken = TelegramBotToken.generate()
            )
        ).bind().let { account ->
            profileCreator.createProfile(
                Profile(
                    id = null,
                    account = account,
                    firstName = null,
                    lastName = null,
                    phone = PhoneNumber(account.username).getOrNull(),
                    telegram = TelegramUsername(account.username).getOrNull()
                )
            ).bind()
            telegramBotConfirmation.getTelegramConfirmationUri(account.tgBotToken)
        }
    }

    override fun loginUser(event: LoginAccountEvent): Either<DomainError, String> = Either.catch {
        authManager.authenticate(
            UsernamePasswordAuthenticationToken(event.username, event.password)
        ).let { auth ->
            tokenGenerator.generate(auth)
        }.also {
            log.info("User with username ${event.username} successfully logged in.")
        }
    }.mapLeft {
        UserLoginError.AuthenticationError(event.username)
    }
}

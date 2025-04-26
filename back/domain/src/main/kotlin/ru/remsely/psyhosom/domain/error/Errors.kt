package ru.remsely.psyhosom.domain.error

sealed interface DomainError {
    val message: String

    interface ValidationError : DomainError
    interface AuthenticationError : DomainError
    interface MissingError : DomainError
    interface BusinessLogicError : DomainError
    interface IntegrationError : DomainError
}

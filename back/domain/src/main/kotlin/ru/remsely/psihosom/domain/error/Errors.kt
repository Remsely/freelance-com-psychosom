package ru.remsely.psihosom.domain.error

sealed interface DomainError {
    val message: String

    interface BusinessLogicError : DomainError
    interface ValidationError : DomainError
}
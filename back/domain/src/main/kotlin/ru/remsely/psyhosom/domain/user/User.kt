package ru.remsely.psyhosom.domain.user

data class User(
    val id: Long? = null,
    val username: String,
    val password: String,
    val role: Role? = null
) {
    enum class Role {
        ADMIN, PATIENT, PSYCHOLOGIST
    }
}

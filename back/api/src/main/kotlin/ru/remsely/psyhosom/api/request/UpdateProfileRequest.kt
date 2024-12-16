package ru.remsely.psyhosom.api.request

data class UpdateProfileRequest(
    val phone: String?,
    val telegram: String?,
    val firstName: String?,
    val lastName: String?
) {
    override fun toString(): String {
        return "UpdateUserProfileRequest()"
    }
}

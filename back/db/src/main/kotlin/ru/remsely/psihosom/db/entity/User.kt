package ru.remsely.psihosom.db.entity

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "app_user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false, unique = true, length = 255)
    private val username: String,

    @Column(nullable = false, length = 255)
    private val password: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val role: Role,
) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = mutableListOf(
        SimpleGrantedAuthority(role.name)
    )

    override fun getPassword(): String = password

    override fun getUsername(): String = username

    enum class Role {
        ADMIN, PATIENT, PSYCHOLOGIST
    }
}

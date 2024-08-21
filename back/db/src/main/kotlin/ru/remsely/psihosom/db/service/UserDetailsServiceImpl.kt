package ru.remsely.psihosom.db.service

import arrow.core.getOrElse
import arrow.core.toOption
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import ru.remsely.psihosom.db.repository.UserRepository

class UserDetailsServiceImpl(
    private val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails {
        if (username == null) {
            throw UsernameNotFoundException("Username not found")
        }
        return userRepository.findByUsername(username)
            .toOption()
            .getOrElse { throw UsernameNotFoundException("User not found") }
    }
}
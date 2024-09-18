package ru.remsely.psihosom.security.service

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component
import ru.remsely.psihosom.domain.user.dao.UserFinder
import ru.remsely.psihosom.security.user.toDetails

@Component
class UserDetailsServiceImpl(
    private val userFinder: UserFinder
) : UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails {
        if (username == null) {
            throw UsernameNotFoundException("Username not found")
        }
        return userFinder.findUserByUsername(username)
            .fold(
                { throw UsernameNotFoundException("User not found") },
                { it.toDetails() }
            )
    }
}
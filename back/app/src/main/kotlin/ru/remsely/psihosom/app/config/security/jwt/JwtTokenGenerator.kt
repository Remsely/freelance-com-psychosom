package ru.remsely.psihosom.app.config.security.jwt

import org.springframework.security.core.Authentication

interface JwtTokenGenerator {
    fun generate(auth: Authentication): String
}
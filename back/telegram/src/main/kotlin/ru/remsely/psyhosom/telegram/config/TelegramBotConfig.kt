package ru.remsely.psyhosom.telegram.config

import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration
import ru.remsely.psyhosom.telegram.properties.TelegramBotEndpoints

@Configuration
@EnableConfigurationProperties(TelegramBotEndpoints::class)
open class TelegramBotConfig

package ru.remsely.psyhosom.domain.extentions

import org.slf4j.Logger
import org.slf4j.LoggerFactory

inline fun <reified T> T.logger(): Logger = LoggerFactory.getLogger(T::class.java) // TODO придумать, как красиво убрать отсюда

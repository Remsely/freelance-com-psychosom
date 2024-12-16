package ru.remsely.psyhosom.db.extensions

import arrow.core.getOrElse
import ru.remsely.psyhosom.db.entity.Account
import ru.remsely.psyhosom.db.entity.Patient
import ru.remsely.psyhosom.db.entity.Psychologist
import ru.remsely.psyhosom.db.entity.Session
import ru.remsely.psyhosom.domain.value_object.PhoneNumber
import ru.remsely.psyhosom.domain.value_object.TelegramBotToken
import ru.remsely.psyhosom.domain.value_object.TelegramChatId
import ru.remsely.psyhosom.domain.value_object.TelegramUsername
import ru.remsely.psyhosom.domain.account.Account as DomainAccount
import ru.remsely.psyhosom.domain.patient.Patient as DomainPatient
import ru.remsely.psyhosom.domain.psychologist.Psychologist as DomainPsychologist
import ru.remsely.psyhosom.domain.session.Session as DomainSession

fun Account.toDomain() = DomainAccount(
    id = id,
    username = username,
    password = password,
    role = role,
    isConfirmed = isConfirmed,
    tgBotToken = TelegramBotToken(tgBotToken).getOrElse {
        throw RuntimeException("Invalid telegram bot token.")
    },
    tgChatId = TelegramChatId(tgChatId).getOrElse {
        throw RuntimeException("Invalid telegram chat id.")
    },
    registrationDate = registrationDate
)

fun Patient.toDomain() = DomainPatient(
    id = id,
    account = account.toDomain(),
    phone = PhoneNumber(phone).getOrElse {
        throw RuntimeException("Invalid phone number.")
    },
    telegram = TelegramUsername(telegram).getOrElse {
        throw RuntimeException("Invalid telegram username.")
    },
    firstName = firstName,
    lastName = lastName,
)

fun Psychologist.toDomain() = DomainPsychologist(
    id = id,
    account = account.toDomain(),
    firstName = firstName,
    lastName = lastName
)

fun Session.toDomain() = DomainSession(
    id = id,
    psychologist = psychologist.toDomain(),
    patient = patient.toDomain(),
    status = status,
    orderDate = orderDate,
    confirmationDate = confirmationDate,
    startDate = startDate,
)

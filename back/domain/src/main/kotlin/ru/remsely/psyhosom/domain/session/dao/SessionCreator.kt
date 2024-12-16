package ru.remsely.psyhosom.domain.session.dao

import arrow.core.Either
import ru.remsely.psyhosom.domain.error.DomainError
import ru.remsely.psyhosom.domain.session.Session

interface SessionCreator {
    fun createSession(session: Session): Either<DomainError, Session>
}

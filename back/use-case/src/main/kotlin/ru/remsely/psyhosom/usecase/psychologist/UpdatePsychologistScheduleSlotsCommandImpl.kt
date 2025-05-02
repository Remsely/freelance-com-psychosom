package ru.remsely.psyhosom.usecase.psychologist

import arrow.core.Either
import org.springframework.stereotype.Component
import ru.remsely.psyhosom.domain.error.DomainError

@Component
class UpdatePsychologistScheduleSlotsCommandImpl(

): UpdatePsychologistScheduleSlotsCommand {
    override fun execute(): Either<DomainError, Unit> {
        TODO("Not yet implemented")
    }
}

package ru.remsely.psyhosom.domain.consultation.extensions

import ru.remsely.psyhosom.domain.consultation.Consultation
import ru.remsely.psyhosom.domain.value_object.MeetingLink

fun Consultation.notifyConsultation(meetingLink: MeetingLink) =
    this.copy(
        status = Consultation.Status.NOTIFIED,
        meetingLink = meetingLink
    )

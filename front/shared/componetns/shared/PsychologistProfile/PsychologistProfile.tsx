"use client";

import {
    ConsultationForm,
    MentorInfo, SliderReview,
} from "@/shared/componetns";
import {PsychologistProfileData} from "@/@types/types";
import {useAuth} from "@/shared/hooks";

interface PsychologistProfileProps {
    specialist: PsychologistProfileData
    psychologistId: number;
}

export function PsychologistProfile({specialist, psychologistId} : PsychologistProfileProps) {
    const {setIsOpenAuthModal} = useAuth();

    return (
        <>
            <MentorInfo specialist={specialist}/>

            <ConsultationForm id={psychologistId} setIsOpenAuthModal={setIsOpenAuthModal}/>

            <SliderReview psychologistId={psychologistId}/>
        </>
    );
}
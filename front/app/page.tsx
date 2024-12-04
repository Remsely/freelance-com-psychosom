"use client";

import {
    FrameTitle,
    MentorInfo,
    ReviewButton,
    SubmitMessage,
    SliderReview
} from "@/shared/componetns/shared";
import {useState} from "react";
import {ConsultationForm} from "@/shared/componetns/shared/Forms";
import {Dialog} from "@/shared/componetns/ui";

export default function Home() {
    const [isOpenForm, setIsOpenForm] = useState(false)

    return (
        <>
            <div className="container">
                <MentorInfo/>

                <ConsultationForm setIsOpen={setIsOpenForm} isOpen={isOpenForm}/>
                <Dialog isOpen={isOpenForm} setIsOpen={setIsOpenForm}> <SubmitMessage
                    title="Поздравляем, вы записаны!"> Вы записались на консультацию к специалисту.
                    Скоро с вами свяжется специалист по методу связи, который вы указали. </SubmitMessage> </Dialog>

                <FrameTitle id="reviews">Отзывы</FrameTitle>

                <SliderReview/>

                <ReviewButton/>
            </div>
        </>
    );
}

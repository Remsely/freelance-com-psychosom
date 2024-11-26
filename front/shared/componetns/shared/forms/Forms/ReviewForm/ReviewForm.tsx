"use client";

import styles from "./ReviewForm.module.scss";
import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Cookie} from "@/shared/enums/cookie";
import {NameInput, StarRatingInput, TextInput} from "@/shared/componetns/shared/forms/Inputs";
import {ButtonMaster, SubmitMessage} from "@/shared/componetns/ui";

interface ReviewFormProps {
    setIsSuccess: (isSuccess: boolean) => void;
}

export function ReviewForm(props: ReviewFormProps) {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isCookies, setIsCookies] = useState<boolean>(false);

    const {register, handleSubmit, reset, formState: {errors}, clearErrors, setValue} = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        const formSubmitted = Cookies.get(Cookie.reviewFormSubmitted);
        if (formSubmitted === 'true') {
            setIsSubmitted(true);
            setIsCookies(true);
            props.setIsSuccess(true);
        }
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data: object) => {
        console.log(data);
        props.setIsSuccess(true);
        setIsSubmitted(true);
        Cookies.set(Cookie.reviewFormSubmitted, "true", {expires: 1});
        reset();
    };

    const handleRatingSelect = (rating: number) => {
        setValue("rating", rating);
    };

    return (
        <>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} ${styles.block}`}>
                    <div className={styles.flexDiv}>
                        <div className={styles.inputs}>
                            <NameInput
                                label="Имя"
                                name="firstname"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                            <NameInput
                                label="Фамилия"
                                name="lastname"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                            <StarRatingInput onRatingSelect={handleRatingSelect}/>
                        </div>
                        <div className={`${styles.textarea} block-modal`}>
                            <TextInput
                                label="Комментарий к отзыву"
                                name="message"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                            />
                        </div>
                    </div>
                    <ButtonMaster className={styles.button} type="submit">Оставить отзыв</ButtonMaster>
                </form>
            ) : (!isCookies ? (
                    <SubmitMessage title="Вы успешно оставили отзыв!">Спасибо за отзыв! Мы очень ценим
                        это!</SubmitMessage>
                ) : (
                    <SubmitMessage title="Вы уже оставили отзыв!">Если вам надо поменять отзыв, пожалуйста, обратитесь к
                        тех. поддержку</SubmitMessage>
                )
            )}
        </>
    );
}

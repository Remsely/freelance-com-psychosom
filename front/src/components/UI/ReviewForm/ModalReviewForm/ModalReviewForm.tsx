import styles from "./ModalReviewForm.module.scss";
import NameInputForm from "../../ConsultationForm/NameInputForm/NameInputForm.tsx";
import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import TextareaForm from "../../ConsultationForm/TextareaForm/TextareaForm.tsx";
import ButtonMaster from "../../ButtonMaster/ButtonMaster.tsx";
import {useEffect, useState} from "react";
import StarRating from "../StarRating/StarRating";
import Cookies from "js-cookie";
import {Cookie} from "../../../../enums/cookie.ts";


export default function ModalReviewForm() {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isCookies, setIsCookies] = useState<boolean>(false);
    const {register, handleSubmit, reset, formState: {errors}, clearErrors, setValue} = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        const formSubmitted = Cookies.get(Cookie.reviewFormSubmitted);
        if (formSubmitted === 'true') {
            setIsSubmitted(true);
            setIsCookies(true)
        }
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data: object) => {
        console.log(data);
        Cookies.set(Cookie.reviewFormSubmitted, 'true', {expires: 1});
        setIsSubmitted(true);
        reset();
    };

    const handleRatingSelect = (rating: number) => {
        setValue("rating", rating);
    };

    return (
        <>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} ${styles.block}`}>
                    <div className={styles.info}>
                        <div className={styles.inputs}>
                            <NameInputForm
                                label="Имя"
                                name="firstname"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                            <NameInputForm
                                label="Фамилия"
                                name="lastname"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                            <StarRating onRatingSelect={handleRatingSelect}/>
                        </div>
                        <div className={`${styles.textarea} block-modal`}>
                            <TextareaForm
                                label="Комментарий к отзыву"
                                name="message"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                            />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <ButtonMaster type="submit">Оставить отзыв</ButtonMaster>
                    </div>
                </form>
            ) : !isCookies ? (
                <div className={styles.success}>
                    <h4 className={styles.title}>Вы успешно оставили отзыв!</h4>
                    <p>Спасибо за отзыв! Мы очень ценим это!</p>
                </div>
            ) : (
                <div className={styles.success}>
                    <h4 className={styles.title}>Вы уже оставили отзыв!</h4>
                    <p className={styles.text}>Если вам надо поменять отзыв, пожалуйста, обратитесь к тех. поддержку</p>
                </div>
            )
            }
        </>
    );
}

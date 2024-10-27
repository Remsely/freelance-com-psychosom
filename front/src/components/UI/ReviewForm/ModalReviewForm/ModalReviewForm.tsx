import styles from "./ModalReviewForm.module.scss";
import NameInputForm from "../../ConsultationForm/NameInputForm/NameInputForm.tsx";
import { FieldError, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextareaForm from "../../ConsultationForm/TextareaForm/TextareaForm.tsx";
import ButtonMaster from "../../ButtonMaster/ButtonMaster.tsx";
import {useState} from "react";
import StarRating from "../StarRating/StarRating";


export default function ModalReviewForm() {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors }, clearErrors, setValue} = useForm({
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FieldValues> = (data: object) => {
        console.log(data);
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
            ) : (
                <p>Спасибо за отзыв! Мы очень ценим это!</p>
            )}
        </>
    );
}

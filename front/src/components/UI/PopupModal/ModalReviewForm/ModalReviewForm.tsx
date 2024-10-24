import styles from "../../ConsultationForm/ConsultationForm.module.scss";
import NameInputForm from "../../ConsultationForm/NameInputForm/NameInputForm.tsx";
import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import TextareaForm from "../../ConsultationForm/TextareaForm/TextareaForm.tsx";
import ButtonMaster from "../../ButtonMaster/ButtonMaster.tsx";

export default function ModalReviewForm(isSubmited, setIsSubmitted) {
    const {register, handleSubmit, reset, formState: {errors}, clearErrors} = useForm({
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FieldValues> = (data: object) => {
        console.log(data);
        setIsSubmitted(true);

        reset();
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} container`}>
                <div className={`${styles.inputs} block`}>
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

                </div>
                <div className={`${styles.textarea} block`}>
                    <TextareaForm
                        label="Опишите свою проблему"
                        name="message"
                        register={register}
                        errors={errors as Record<string, FieldError | undefined>}
                    />
                    <ButtonMaster type="submit">Записаться</ButtonMaster>
                </div>
            </form>
        </>
    )
}
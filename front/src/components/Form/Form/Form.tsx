import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import RowForm from "../RowForm/RowForm.tsx";
import TextareaForm from "../TextareaForm/TextareaForm.tsx";
import styles from "./Form.module.scss"

interface FormProps {
    setIsOpen: (isOpen: boolean) => void
}

export default function Form({setIsOpen} : FormProps) {

    const {register, handleSubmit, reset, formState: { errors }} = useForm({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<FieldValues> = (data: object) => {
        console.log(data);
        setIsOpen(true)
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} container`}>
                <div className={`${styles.inputs} block`}>
                    <RowForm label="Имя" name="firstname" register={register} error={errors.firstname}/>
                    <RowForm label="Фамилия" name="lastname" register={register} error={errors.lastname}/>
                    <RowForm label="Телефон / Telegram" name="contact" register={register} error={errors.contact}/>
                </div>
                <div className={`${styles.textarea} block`}>
                    <TextareaForm register={register} error={errors.textarea}/>
                    <button className={styles.button} type="submit">Записаться</button>
                </div>
            </form>
        </>
    )
}
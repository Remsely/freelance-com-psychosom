import {useForm} from "react-hook-form";
import RowForm from "../RowForm/RowForm.tsx";
import TextareaForm from "../TextareaForm/TextareaForm.tsx";
import styles from "./Form.module.scss"

interface FormProps {
    setIsOpen: (isOpen: boolean) => void
}

export default function Form({setIsOpen} : FormProps) {

    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data: object) => {
        console.log(data);
        setIsOpen(true)
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} container`}>
                <div className={`${styles.inputs} block`}>
                    <RowForm label="Имя" name="firstname" register={register}/>
                    <RowForm label="Фамилия" name="lastname" register={register}/>
                    <RowForm label="Телефон / Telegram" name="contact" register={register}/>
                </div>
                <div className={`${styles.textarea} block`}>
                    <TextareaForm register={register}/>
                    <button className={styles.button} type="submit">Записаться</button>
                </div>
            </form>
        </>
    )
}
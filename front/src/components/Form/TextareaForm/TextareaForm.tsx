import {FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister} from "react-hook-form";
import styles from "./TextareaForm.module.scss"

interface TextareaFormProps {
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
}

export default function TextareaForm({ register, error } : TextareaFormProps) {

    return (
        <>
            <p className={styles.p}>Опишите свою проблему</p>
            <textarea className={styles.textarea} placeholder="Опишите свою проблему" {...register("message", {required: 'Это поле обязательное',})}/>
            {error && typeof error.message === 'string' && (
                <p className={styles.error}>{error.message}</p>
            )}
        </>
    )
}
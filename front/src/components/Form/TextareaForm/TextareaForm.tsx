import {FieldValues, UseFormRegister} from "react-hook-form";
import styles from "./TextareaForm.module.scss"

interface TextareaFormProps {
    register: UseFormRegister<FieldValues>;
}

export default function TextareaForm({ register } : TextareaFormProps) {

    return (
        <>
            <p className={styles.p}>Опишите свою проблему</p>
            <textarea className={styles.textarea} {...register("message", {required: true})}/>
        </>
    )
}
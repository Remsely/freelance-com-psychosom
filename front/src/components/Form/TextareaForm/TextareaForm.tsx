import {FieldValues, UseFormRegister} from "react-hook-form";
import styles from "./TextareaForm.module.scss"

interface TextareaFormProps {
    register: UseFormRegister<FieldValues>;
}

export default function TextareaForm({ register } : TextareaFormProps) {

    return (
        <>
            <div className={`${styles.textarea} block`} >
                <p>Опишите свою проблему</p>
                <textarea {...register("message", {required: true})}/>
                <button type="submit">Записаться</button>
            </div>
        </>
    )
}
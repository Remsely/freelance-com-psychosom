import {FieldError, FieldValues, UseFormRegister} from "react-hook-form";
import styles from "./TextInput.module.scss";

interface TextInputProps {
    label: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    errors: Record<string, FieldError | undefined>;
}

export function TextInput({ label, name, register, errors }: TextInputProps) {
    return (
        <>
            <h2 className={styles.title}>{label}</h2>
            <textarea className={styles.textarea}
                maxLength={2047}
                {...register(name)}
                placeholder={label}
            ></textarea>
            {errors[name] && <p className={styles.error}>{(errors[name] as FieldError).message}</p>}
        </>
    );
}

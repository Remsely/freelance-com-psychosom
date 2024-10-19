import {FieldError, FieldValues, UseFormRegister} from "react-hook-form";
import styles from "../ConsultationForm.module.scss";

interface TextareaProps {
    label: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    errors: Record<string, FieldError | undefined>;
}

export default function Textarea({ label, name, register, errors }: TextareaProps) {
    return (
        <>
            <h2 className={styles.p}>{label}</h2>
            <textarea
                {...register(name)}
                placeholder={label}
            ></textarea>
            {errors[name] && <p className={styles.error}>{(errors[name] as FieldError).message}</p>}
        </>
    );
}

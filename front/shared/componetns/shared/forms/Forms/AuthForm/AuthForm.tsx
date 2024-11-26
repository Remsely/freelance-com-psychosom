import {ContactInput, PasswordInput} from "@/shared/componetns/shared/forms/Inputs";
import {FieldError, useForm} from "react-hook-form";
import {ButtonMaster} from "@/shared/componetns/ui";
import styles from "./AuthForm.module.scss"

export function AuthForm() {
    const {register, formState: {errors}, clearErrors} = useForm({
        mode: "onBlur",
    });


    return (
        <form action="" className={styles.form}>
            <div className={styles.inputs}>
                <ContactInput register={register} clearErrors={clearErrors}
                              errors={errors as Record<string, FieldError | undefined>}/>
                <PasswordInput/>
            </div>
            <ButtonMaster type="button" className={styles.button}>Войти</ButtonMaster>
        </form>
    )
}

import {ContactInput} from "../ConsultationForm";
import {PasswordInput} from "@/shared/componetns/ui/forms/Inputs/PasswordInput/PasswordInput";
import {FieldError, useForm} from "react-hook-form";
import {ButtonMaster} from "@/shared/componetns/ui";
import styles from "./AuthForm.module.scss"

export function AuthForm() {
    const {register, formState: {errors}, clearErrors} = useForm({
        mode: "onBlur",
    });


    return (
        <form action="">
            <ContactInput register={register} clearErrors={clearErrors}
                          errors={errors as Record<string, FieldError | undefined>}/>
            <PasswordInput/>
            <ButtonMaster type="button" className={styles.button}>Войти</ButtonMaster>
        </form>
    )
}

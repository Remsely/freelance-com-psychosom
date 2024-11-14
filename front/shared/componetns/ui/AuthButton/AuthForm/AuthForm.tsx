import {ContactInputForm} from "@/shared/componetns/ui/ConsultationForm";
import {PasswordInput} from "./PasswordInput/PasswordInput";
import {FieldError, useForm} from "react-hook-form";
import {ButtonMaster} from "@/shared/componetns/ui";
import styles from "./AuthForm.module.scss"

export function AuthForm() {
    const {register, formState: {errors}, clearErrors} = useForm({
        mode: "onBlur",
    });


    return (
        <form action="">
            <ContactInputForm register={register} clearErrors={clearErrors}
                              errors={errors as Record<string, FieldError | undefined>}/>
            <PasswordInput/>
            <ButtonMaster type="button" className={styles.button}>Войти</ButtonMaster>
        </form>
    )
}

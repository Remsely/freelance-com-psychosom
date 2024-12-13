import {ContactInput, PasswordInput} from "@/shared/componetns/shared/Inputs";
import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/shared/componetns/ui";
import styles from "./AuthForm.module.scss"
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";
import {signIn} from "next-auth/react";
import useDialogStore from "@/shared/stores/dialogStore";
import {Github} from "lucide-react";

// const socket = io("http://localhost:4000");

export function AuthForm() {
    const {register, formState: {errors}, clearErrors, handleSubmit, watch} = useForm({
        mode: "onBlur",
    });

    const [qrLink, setQrLink] = useState<string | null>(null);
    const [mode, setMode] = useState<"login" | "register">("login");
    const setTitle = useDialogStore((state) => state.setTitle);

    useEffect(() => {
        if (mode === "login") {
            setTitle("Вход в аккаунт")
        }
        if (mode === "register") {
            setTitle("Регистрация")
        }
    }, [mode, setTitle]);

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        console.log(data)
        if (mode === 'login') {
            toast.success('Вы успешно авторизовались!')
        } else {
            setQrLink('https://www.google.com/')
        }

        //     if (mode === "login") {
        //         const result = await signIn("credentials", {
        //             identifier: data.identifier,
        //             password: data.password,
        //             redirect: false,
        //         });
        //         if (result?.error) {
        //             toast.error("Ошибка авторизации");
        //         } else {
        //             toast.success("Вы успешно вошли!");
        //         }
        //     } else {
        //         socket.emit("start-registration", { phone: data.identifier });
        //
        //         socket.on("qr-code", (qr: string) => setQrLink(qr));
        //
        //         socket.on("registration-confirmed", () => {
        //             toast.success("Регистрация подтверждена!");
        //             reset();
        //         });
        //     }
    };

    const onSwitchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    return (
        <>
            <div>
                {qrLink ? (
                    <div>
                        <h2>Подтвердите через Telegram</h2>
                        <img src={qrLink} alt="QR Code для Telegram"/>
                        <p>Сканируйте QR код в Telegram</p>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.inputs}>
                                <ContactInput register={register} clearErrors={clearErrors}
                                              errors={errors as Record<string, FieldError | undefined>}/>
                                <PasswordInput register={register}
                                               errors={errors as Record<string, FieldError | undefined>} watch={watch}/>
                                {mode === "register" && (
                                    <PasswordInput register={register}
                                                   errors={errors as Record<string, FieldError | undefined>}
                                                   watch={watch} mode="again"/>
                                )}
                            </div>
                            <Button type="submit" className={styles.button}>{
                                mode === "login"
                                    ? "Войти"
                                    : "Зарегистрироваться"}</Button>
                            {mode === "register"
                                ? (<p className={styles.paragraph}>Есть аккаунт? <a className={styles.switchMode}
                                                                                    onClick={onSwitchMode}>Вход в
                                    аккаунт</a></p>)
                                : (<p className={styles.paragraph}>Нет аккаунта? <a className={styles.switchMode}
                                                                                    onClick={onSwitchMode}>Зарегистрироваться</a>
                                </p>)}
                            {/* FOR DEV */}
                            <Button type="button" className={styles.buttonRegistration}
                                    onClick={() => signIn('github', {callbackUrl: '/', redirect: true})}><Github/>GitHub</Button>
                            {/* FOR DEV */}
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

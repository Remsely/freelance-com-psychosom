"use client";

import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import styles from "./ConsultationForm.module.scss";
import {Button} from "@/shared/componetns/ui";
import {ContactInput, NameInput, TextInput} from "@/shared/componetns/shared/Inputs";
import {FrameTitle} from "@/shared/componetns/shared";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {CircleAlert} from "lucide-react";

interface ConsultationFormProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

export function ConsultationForm(props: ConsultationFormProps) {
    const {data: session} = useSession();
    const {register, handleSubmit, reset, formState: {errors}, clearErrors} = useForm({
        mode: "onBlur",
    });

    const [contactValue, setContactValue] = useState<string>("");

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        if (session) {
            try {
                const response = await fetch(`/api/proxy/api/v1/psychologists/1/consultations`, {
                    method: "POST",
                });

                if (!response.ok) {
                    throw new Error('Не удалось записать на консультацию!');
                }

                props.setIsOpen(true);
                reset();
                setContactValue("");
                toast.success("Вы успешно записаны на консультацию!");
            } catch (error) {
                console.error(error);
                toast.error("Произошла ошибка при записи на консультацию. Пожалуйста, попробуйте позже.");
            }
        } else {
            props.setIsOpen(true);
            toast("Прежде чем записаться к специалисту, пожалуйста, войдите в аккаунт", {
                icon: <CircleAlert/>,
                duration: 3000,
                className: styles.toast
            })
        }
    };

    return (
        <>
            <FrameTitle id="consultation">Запишитесь на консультацию</FrameTitle>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={`${styles.leftColumn} ${styles.block}`}>
                        <div className={styles.inputs}>
                            <NameInput
                                label="Имя"
                                name="firstName"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                            <NameInput
                                label="Фамилия"
                                name="lastName"
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                            <ContactInput
                                contactValue={contactValue}
                                setContactValue={setContactValue}
                                register={register}
                                errors={errors as Record<string, FieldError | undefined>}
                                clearErrors={clearErrors}
                            />
                        </div>
                    </div>

                    <div className={`${styles.textarea} ${styles.block}`}>
                        <TextInput
                            label="Опишите свою проблему"
                            name="message"
                            register={register}
                            errors={errors as Record<string, FieldError | undefined>}
                        />
                        <Button className={styles.buttonForm} type="submit">Записаться</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import styles from "./ConsultationForm.module.scss";
import ContactInput from "./ContactInput/ContactInput";
import NameInput from "./NameInput/NameInput";
import MessageInput from "./MessageInput/MessageInput";

interface ConsultationFormProps {
    setIsOpen: (isOpen: boolean) => void;
}

export default function ConsultationForm({setIsOpen}: ConsultationFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onChange",
    });

    const [isTelegram, setIsTelegram] = useState<boolean>(false);
    const [contactValue, setContactValue] = useState<string>("");

    const onSubmit: SubmitHandler<FieldValues> = (data: object) => {
        console.log(data);
        setIsOpen(true);
        reset();
        setContactValue("");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} container`}>
            <div className={`${styles.inputs} block`}>
                <NameInput
                    label="Имя"
                    name="firstname"
                    register={register}
                    errors={errors as Record<string, FieldError | undefined>}
                />
                <NameInput
                    label="Фамилия"
                    name="lastname"
                    register={register}
                    errors={errors as Record<string, FieldError | undefined>}
                />
                <ContactInput
                    isTelegram={isTelegram}
                    setIsTelegram={setIsTelegram}
                    contactValue={contactValue}
                    setContactValue={setContactValue}
                    register={register}
                    errors={errors as Record<string, FieldError | undefined>}
                />
            </div>

            <div className={`${styles.textarea} block`}>
                <MessageInput
                    label="Опишите свою проблему"
                    name="message"
                    register={register}
                    errors={errors as Record<string, FieldError | undefined>}
                />
                <button className={styles.button} type="submit">Записаться</button>
            </div>
        </form>
    );
}

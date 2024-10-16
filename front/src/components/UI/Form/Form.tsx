import {FieldError, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import styles from "./Form.module.scss";

interface FormProps {
    setIsOpen: (isOpen: boolean) => void;
}

export default function Form({ setIsOpen }: FormProps) {
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

    const formatPhoneNumber = (value: string) => {
        let inputNumbersValue = value.replace(/\D/g, '');
        if (inputNumbersValue.length === 0) return '';
        let formatted: string;
        if (['7', '8', '9'].includes(inputNumbersValue[0])) {
            if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
            formatted = (inputNumbersValue[0] === '8' ? '8' : '+7') + ' ';
            formatted += `(${inputNumbersValue.substring(1, 4)}`;
            if (inputNumbersValue.length > 4) formatted += `) ${inputNumbersValue.substring(4, 7)}`;
            if (inputNumbersValue.length > 7) formatted += `-${inputNumbersValue.substring(7, 9)}`;
            if (inputNumbersValue.length > 9) formatted += `-${inputNumbersValue.substring(9, 11)}`;
        } else {
            formatted = '+' + inputNumbersValue;
        }
        return formatted;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
        let value = e.target.value;

        if (label === "Имя" || label === "Фамилия") {
            value = value.replace(/[^а-яА-Яa-zA-Z]/g, '');
            e.target.value = value;
            return;
        }


        if (label === "Телефон / Telegram") {
            if (isTelegram) {
                if (value.startsWith('7') || value.startsWith('8')) {
                    setIsTelegram(false);
                    value = formatPhoneNumber(value.replace(/[^0-9]/g, ''));
                } else {
                    if (!value.startsWith('@')) {
                        value = '@' + value.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
                    } else {
                        value = '@' + value.slice(1).replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
                    }
                }
            } else {
                if (value.includes('@')) {
                    setIsTelegram(true);
                    value = '@' + value.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
                } else {
                    value = formatPhoneNumber(value.replace(/[^0-9]/g, ''));
                }
            }
        }

        setContactValue(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, label: string) => {
        if (e.key === 'Backspace') {
            const currentValue = e.currentTarget.value;
            if (label === "Телефон / Telegram" && !isTelegram) {
                const inputNumbersValue = currentValue.replace(/\D/g, '');
                if (inputNumbersValue.length <= 1) {
                    e.currentTarget.value = '';
                }
            } else if (label === "Имя" || label === "Фамилия" || isTelegram) {
                if (currentValue.length === 1) {
                    e.currentTarget.value = '';
                }
            }
        }
    };

    const handleModeChange = (mode: 'phone' | 'telegram') => {
        setIsTelegram(mode === 'telegram');
        setContactValue(mode === 'telegram' ? '@' : '');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} container`}>
            <div className={`${styles.inputs} block`}>
                {['firstname', 'lastname'].map((field) => (
                    <div key={field} className={styles.row}>
                        <h2>{field === 'firstname' ? 'Имя' : 'Фамилия'}</h2>
                        <input
                            type="text"
                            placeholder={field === 'firstname' ? 'Имя' : 'Фамилия'}
                            onKeyDown={(e) => handleKeyDown(e, field === 'firstname' ? "Имя" : "Фамилия")}
                            {...register(field, {
                                required: "Это поле обязательное",
                                pattern: {
                                    value: /^[а-яА-Яa-zA-Z]+$/,
                                    message: "Допустимы только буквы",
                                },
                                onChange: (e) => handleChange(e, field === 'firstname' ? "Имя" : "Фамилия"),
                            })}
                        />
                        {errors[field] && <p className={styles.error}>{(errors[field] as FieldError).message}</p>}
                    </div>
                ))}

                <div className={styles.row}>
                    <h2>
                        <a className={!isTelegram ? styles.active : ""} onClick={() => handleModeChange('phone')}>
                            Телефон
                        </a>{" "}
                        /{" "}
                        <a className={isTelegram ? styles.active : ""} onClick={() => handleModeChange('telegram')}>
                            Telegram
                        </a>
                    </h2>
                    <input
                        type="text"
                        placeholder={isTelegram ? "Telegram" : "Телефон"}
                        onKeyDown={(e) => handleKeyDown(e, "Телефон / Telegram")}
                        value={contactValue}
                        {...register("contact", {
                            required: "Это поле обязательное",
                            onChange: (e) => handleChange(e, "Телефон / Telegram"),
                        })}
                    />
                    {errors.contact && <p className={styles.error}>{(errors.contact as FieldError).message}</p>}
                </div>
            </div>

            <div className={`${styles.textarea} block`}>
                <h2 className={styles.p}>Опишите свою проблему</h2>
                <textarea
                    {...register("message", {required: "Это поле обязательное"})}
                    placeholder="Опишите свою проблему"
                ></textarea>
                {errors.message && <p className={styles.error}>{(errors.message as FieldError).message}</p>}
                <button className={styles.button} type="submit">Записаться</button>
            </div>
        </form>
    );
}

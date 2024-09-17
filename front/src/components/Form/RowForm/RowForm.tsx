import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./RowForm.module.scss";
import { ChangeEvent, useState, useEffect } from "react";
import "../../../utils/formatinput.ts";

interface InputProps {
    label: string;
    name: string;
    type: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

export default function RowForm({ label, name, type, register, required }: InputProps) {
    const [isTelegram, setIsTelegram] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const showTelegramOptions = label === "Телефон / Telegram";

    const { onChange: onChangeHandler, ...restRegister } = register(name, { required });

    useEffect(() => {
        if (inputValue.startsWith('@') !== isTelegram) {
            setIsTelegram(inputValue.startsWith('@'));
        }
    }, [inputValue, isTelegram]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (isTelegram && !value.startsWith('@')) {
            value = '@' + value.replace(/^@+/, ''); // Добавляем @ и убираем лишние @ в середине
        }

        setInputValue(value);
        onChangeHandler?.(e);
    };

    const handlePhoneClick = () => {
        setIsTelegram(false);
        setInputValue("");
    };

    const handleTelegramClick = () => {
        if (!isTelegram) {
            setIsTelegram(true);
            setInputValue(prev => (prev.startsWith("@") ? prev : "@" + prev));
        }
    };

    const placeholder = showTelegramOptions
        ? (isTelegram ? "Telegram" : "Телефон")
        : label;

    return (
        <div className={styles.row}>
            {showTelegramOptions ? (
                <p>
                    <a className={!isTelegram ? styles.active : ""} onClick={handlePhoneClick}>Телефон</a>
                    {' / '}
                    <a className={isTelegram ? styles.active : ""} onClick={handleTelegramClick}>Telegram</a>
                </p>
            ) : (
                <p>{label}</p>
            )}
            <input type={type} placeholder={placeholder} value={inputValue} onChange={handleChange} {...restRegister}/>
        </div>
    );
}

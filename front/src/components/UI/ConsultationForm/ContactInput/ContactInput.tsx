import {ChangeEvent, KeyboardEvent} from "react";
import {FieldError, FieldValues, UseFormRegister} from "react-hook-form";
import styles from "../ConsultationForm.module.scss";

interface ContactInputProps {
    isTelegram: boolean;
    setIsTelegram: (value: boolean) => void;
    contactValue: string;
    setContactValue: (value: string) => void;
    register: UseFormRegister<FieldValues>;
    errors: Record<string, FieldError | undefined>;
}

export default function ContactInput({
                                         isTelegram,
                                         setIsTelegram,
                                         contactValue,
                                         setContactValue,
                                         register,
                                         errors,
                                     }: ContactInputProps) {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

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

        setContactValue(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            const currentValue = e.currentTarget.value;
            const inputNumbersValue = currentValue.replace(/\D/g, '');
            if (inputNumbersValue.length <= 1) {
                e.currentTarget.value = '';
            }
        }
    };

    const handleModeChange = (mode: 'phone' | 'telegram') => {
        setIsTelegram(mode === 'telegram');
        setContactValue(mode === 'telegram' ? '@' : '');
    };

    return (
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
                value={contactValue}
                onKeyDown={handleKeyDown}
                {...register("contact", {
                    required: "Это поле обязательное",
                    onChange: handleChange,
                })}
            />
            {errors.contact && <p className={styles.error}>{(errors.contact as FieldError).message}</p>}
        </div>
    );
}
import {FieldValues, UseFormRegister} from "react-hook-form";
import styles from "./RowForm.module.scss";
import {ChangeEvent, useState, useEffect, KeyboardEvent, useRef} from "react";

interface RowFormProps {
    label: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

export default function RowForm({label, name, register, required}: RowFormProps) {
    const [isTelegram, setIsTelegram] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const showTelegramOptions = label === "Телефон / Telegram";
    const placeholder = showTelegramOptions ? (isTelegram ? "Telegram" : "Номер телефона") : label;
    const {onChange: onChangeHandler, ref, ...restRegister} = register(name, {required});

    useEffect(() => {
        if (inputRef.current) {
            setIsTelegram(inputRef.current.value.startsWith('@'));
        }
    }, []);

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

        if (label === "Имя" || label === "Фамилия") {
            value = value.replace(/[^а-яА-Яa-zA-Z]/g, '');
        } else if (value.startsWith('@')) {
            setIsTelegram(true);
            value = '@' + value.slice(1).replace(/[^a-zA-Z0-9]/g, '');
        } else {
            setIsTelegram(false);
            value = value.replace(/[^0-9]/g, '');
            value = formatPhoneNumber(value);
        }

        if (inputRef.current) {
            inputRef.current.value = value;
        }

        const event = {
            target: {
                value: value,
            },
        } as ChangeEvent<HTMLInputElement>;

        onChangeHandler?.(event);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        if (inputRef.current) {
            inputRef.current.value = mode === 'telegram' ? '@' : '';
        }
    };

    const combinedRef = (el: HTMLInputElement | null) => {
        inputRef.current = el;
        ref(el);
    };

    return (
        <div className={styles.row}>
            {showTelegramOptions ? (
                <p>
                    <a className={!isTelegram ? styles.active : ""} onClick={() => handleModeChange('phone')}>
                        Телефон
                    </a>
                    {' / '}
                    <a className={isTelegram ? styles.active : ""} onClick={() => handleModeChange('telegram')}>
                        Telegram
                    </a>
                </p>
            ) : (<p>{label}</p>)}
            <input
                ref={combinedRef}
                type={isTelegram ? 'text' : 'tel'}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restRegister}
                maxLength={isTelegram ? 18 : undefined}
            />
        </div>
    );
}
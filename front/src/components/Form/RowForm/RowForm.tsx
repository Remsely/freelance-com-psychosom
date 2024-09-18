import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./RowForm.module.scss";
import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";

interface RowFormProps {
    label: string;
    name: string;
    type: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

export default function RowForm({ label, name, type, register, required }: RowFormProps) {
    const [inputValue, setInputValue] = useState<string>("");
    const [isTelegram, setIsTelegram] = useState<boolean>(false);

    const showTelegramOptions = label === "Телефон / Telegram";
    const { onChange: onChangeHandler, ...restRegister } = register(name, { required });

    useEffect(() => {
        setIsTelegram(inputValue.startsWith('@'));
    }, [inputValue]);

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
        if (value.startsWith('@')) {
            setIsTelegram(true);
            value = '@' + value.replace(/@+/g, '');
        } else {
            setIsTelegram(false);
            value = value.replace(/[^0-9]/g, '');
            value = formatPhoneNumber(value);
        }
        setInputValue(value);
        onChangeHandler?.(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isTelegram && e.key === 'Backspace') {
            const inputNumbersValue = inputValue.replace(/\D/g, '');
            if (inputNumbersValue.length <= 1) setInputValue('');
        }
    };

    const handleModeChange = (mode: 'phone' | 'telegram') => {
        setIsTelegram(mode === 'telegram');
        setInputValue(mode === 'telegram' ? '@' : '');
    };

    const placeholder = showTelegramOptions ? (isTelegram ? "Telegram" : "Телефон") : label;

    return (
        <div className={styles.row}>
            {showTelegramOptions && (
                <p>
                    <a className={!isTelegram ? styles.active : ""} onClick={() => handleModeChange('phone')}>
                        Телефон
                    </a>
                    {' / '}
                    <a className={isTelegram ? styles.active : ""} onClick={() => handleModeChange('telegram')}>
                        Telegram
                    </a>
                </p>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restRegister}
                maxLength={type === "tel" ? 18 : undefined}
            />
        </div>
    );
}

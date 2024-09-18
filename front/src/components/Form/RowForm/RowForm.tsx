import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./RowForm.module.scss";
import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";

interface InputProps {
    label: string;
    name: string;
    type: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

export default function RowForm({ label, name, type, register, required }: InputProps) {
    const [inputValue, setInputValue] = useState<string>(""); // Стейт для значения инпута
    const [isTelegram, setIsTelegram] = useState<boolean>(false); // Стейт для режима Telegram

    const showTelegramOptions = label === "Телефон / Telegram"; // Проверка для показа опций
    const { onChange: onChangeHandler, ...restRegister } = register(name, { required });

    // Обновляем стейт isTelegram при изменении значения инпута
    useEffect(() => {
        setIsTelegram(inputValue.startsWith('@')); // Режим Telegram включается, если значение начинается с '@'
    }, [inputValue]);

    // Функция для форматирования телефонного номера
    const formatPhoneNumber = (value: string) => {
        let inputNumbersValue = value.replace(/\D/g, ''); // Оставляем только цифры
        let formattedInputValue = '';

        if (inputNumbersValue.length === 0) {
            return ''; // Возвращаем пустую строку, если нет цифр
        }

        if (['7', '8', '9'].includes(inputNumbersValue[0])) {
            if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
            const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
            formattedInputValue = firstSymbols + ' ';
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue; // Если это не цифра 7, 8 или 9
        }

        return formattedInputValue;
    };

    // Обработчик изменения ввода
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Если введён '@', переключаемся в режим Telegram
        if (value.startsWith('@')) {
            setIsTelegram(true);
        } else {
            setIsTelegram(false);
        }

        // Применяем маску только к цифрам, если не в режиме Telegram
        if (!isTelegram) {
            const cleanValue = value.replace(/[^0-9@]/g, ''); // Убираем все символы, кроме цифр и '@'
            value = cleanValue.startsWith('@') ? cleanValue : formatPhoneNumber(cleanValue);
        }

        // Обновляем состояние и вызываем onChange
        setInputValue(value);
        onChangeHandler?.(e);
    };

    // Обработчик клавиши Backspace
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isTelegram) return; // Не обрабатываем клавиши в режиме Telegram

        const inputNumbersValue = inputValue.replace(/\D/g, ''); // Оставляем только цифры

        // Если остаётся только одна цифра или все цифры стерты, очищаем инпут
        if (e.key === 'Backspace' && inputNumbersValue.length === 1) {
            setInputValue('');
        }
    };

    // Placeholder в зависимости от режима
    const placeholder = showTelegramOptions ? (isTelegram ? "Telegram" : "Телефон") : label;

    return (
        <div className={styles.row}>
            {showTelegramOptions && (
                <p>
                    <a className={!isTelegram ? styles.active : ""} onClick={() => setInputValue('')}>
                        Телефон
                    </a>
                    {' / '}
                    <a className={isTelegram ? styles.active : ""} onClick={() => setInputValue('@')}>
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

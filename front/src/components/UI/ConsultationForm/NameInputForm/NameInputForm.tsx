import {ChangeEvent, KeyboardEvent} from "react";
import {FieldError, FieldValues, UseFormClearErrors, UseFormRegister} from "react-hook-form";
import styles from "../ConsultationForm.module.scss";

interface NameInputProps {
    label: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    errors: Record<string, FieldError | undefined>;
    clearErrors: UseFormClearErrors<FieldValues>;
}

export default function NameInputForm({label, name, register, errors, clearErrors}: NameInputProps) {
    const translateToCyrillic = (input: string): string => {
        const translationMap: { [key: string]: string } = {
            q: 'й', w: 'ц', e: 'у', r: 'к', t: 'е', y: 'н', u: 'г', i: 'ш', o: 'щ', p: 'з',
            a: 'ф', s: 'ы', d: 'в', f: 'а', g: 'п', h: 'р', j: 'о', k: 'л', l: 'д',
            z: 'я', x: 'ч', c: 'с', v: 'м', b: 'и', n: 'т', m: 'ь',

        };

        return input.split('').map(char => translationMap[char] || char).join('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fullValue = e.target.value.slice(0, -1);
        const lastChar = e.target.value.slice(-1);
        e.target.value = fullValue + translateToCyrillic(lastChar).replace(/[^а-яА-Я-]/g, '');
        clearErrors(name);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && e.currentTarget.value.length === 1) {
            e.currentTarget.value = '';
        }
    };

    return (
        <div className={styles.row}>
            <h2>{label}</h2>
            <input
                type="text"
                placeholder={label}
                onKeyDown={handleKeyDown}
                maxLength={255}
                {...register(name, {
                    required: "Это поле обязательное",
                    pattern: {
                        value: /^[а-яА-Я-]*$/,
                        message: "Допустимы только буквы и дефис",
                    },
                    onChange: handleChange,
                })}
            />
            {errors[name] && <p className={styles.error}>{(errors[name] as FieldError).message}</p>}
        </div>
    );
}

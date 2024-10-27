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

export default function NameInputForm({ label, name, register, errors, clearErrors }: NameInputProps) {
    const translateToCyrillic = (input: string): string => {
        const translationMap: { [key: string]: string } = {
            a: 'ф', b: 'и', c: 'с', d: 'в', e: 'у', f: 'а', g: 'п',
            h: 'п', i: 'г', j: 'й', k: 'л', l: 'д', m: 'ь', n: 'т',
            o: 'щ', p: 'з', q: 'й', r: 'к', s: 'ы', t: 'е', u: 'ж',
            v: 'ч', w: 'ц', x: 'ъ', y: 'э', z: 'я'
        };

        return input.split('').map(char => translationMap[char] || char).join('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = translateToCyrillic(e.target.value).replace(/[^а-яА-Я-]/g, '');
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

"use client";

import styles from "./PasswordInput.module.scss"
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {FieldError, FieldValues, UseFormRegister} from "react-hook-form";

interface PasswordInputProps {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, FieldError | undefined>;
    mode?: string;
}

export function PasswordInput(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className={styles.row}>
                <h2 className={styles.title}>{props.mode === "again" ? "Повторите пароль" : "Пароль"}</h2>
                <div className={styles.input}>
                    <input type={showPassword ? "text" : "password"} {...props.register("password", {
                        required: "Это поле обязательное",
                        pattern: {
                            value: /^.{8,}$/,
                            message: "Пароль должен быть не менее 8 символов",
                        },
                    })}/>
                    {props.errors.password && <p className={styles.error}>{props.errors.password.message}</p>}
                    <i className={styles.eye} onClick={toggleShowPassword}>
                        {showPassword ?
                            <EyeOff/> :
                            <Eye/>}
                    </i>
                </div>
            </div>
        </>
    );
}
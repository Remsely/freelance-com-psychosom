"use client";

import styles from "./PasswordInput.module.scss"
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

export function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <h2 className={styles.title}>Пароль</h2>
            <div className={styles.input}>
                <input type={showPassword ? "text" : "password"}/>
                <i className={styles.eye} onClick={toggleShowPassword}>
                    {showPassword ?
                        <EyeOff/> :
                        <Eye/>}
                </i>
            </div>
        </>
    );
}
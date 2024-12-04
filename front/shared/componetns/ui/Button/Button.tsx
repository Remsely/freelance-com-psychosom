import styles from "./Button.module.scss";
import {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
}

export function Button(props : ButtonProps) {
    return (
        <button className={`${styles.button} ${props.className}`} type={props.type} onClick={props.onClick}>{props.children}</button>
    )
}

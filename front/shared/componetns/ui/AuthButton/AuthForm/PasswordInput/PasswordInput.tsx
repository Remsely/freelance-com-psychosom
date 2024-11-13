import styles from "./PasswordInput.module.scss"

export function PasswordInput() {
    return (
        <input type="password" className={styles.input}/>
    );
}
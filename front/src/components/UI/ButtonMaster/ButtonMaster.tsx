import styles from "./ButtonMaster.module.scss";

interface ButtonMasterProps {
    type: "button" | "submit";
    text: string;
}

export default function ButtonMaster({text, type} : ButtonMasterProps) {
    return (
        <button className={styles.button} type={type}>{text}</button>
    )
}
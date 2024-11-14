import styles from "./../PopupModal.module.scss"
import {X} from "lucide-react";

interface CloseModalButtonProps {
    setIsOpen: (isOpen: boolean) => void;
}

export function CloseModalButton({setIsOpen}: CloseModalButtonProps) {
    return (
        <X width={30} className={styles.svg} onClick={() => {setIsOpen(false)}}/>
    )
}

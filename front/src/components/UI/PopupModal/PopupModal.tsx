import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import styles from "./PopupModal.module.scss"
import CloseModalButton from "./CloseModalButton/CloseModalButton.tsx";

interface PopupModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    description?: string;
    image?: string;
    alt?: string;
}

export default function PopupModal({isOpen, setIsOpen, title, description, image, alt}: PopupModalProps) {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.dialog}>
            <div className={styles.background}>
                <DialogPanel className={styles.panel}>
                    <div className={styles.header}>
                        {title && <DialogTitle className={styles.title}>{title}</DialogTitle>}
                        <CloseModalButton setIsOpen={setIsOpen}/>
                    </div>
                    {description && <p>{description}</p>}
                    {image && <img src={`/${image}`} alt={alt}/>}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

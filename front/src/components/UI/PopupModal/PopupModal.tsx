import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import styles from "./PopupModal.module.scss"

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
                        <div className={styles.closeModal}>
                            <svg onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </div>
                    </div>
                    {description && <p>{description}</p>}
                    {image && <img src={`/${image}`} alt={alt}/>}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

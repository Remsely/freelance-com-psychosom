import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import styles from "./PopupModal.module.scss"
import CloseModalButton from "./CloseModalButton/CloseModalButton.tsx";
import ModalReviewForm from "../ReviewForm/ModalReviewForm/ModalReviewForm.tsx";

interface PopupModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    children?: string;
    image?: string;
    alt?: string;
    form?: boolean;
}

export default function PopupModal({isOpen, setIsOpen, title, children, image, alt, form}: PopupModalProps) {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.dialog}>
            <div className={styles.background}>
                <DialogPanel className={styles.panel}>
                    <div className={styles.header}>
                        {title && <DialogTitle className={styles.title}>{title}</DialogTitle>}
                        <CloseModalButton setIsOpen={setIsOpen}/>
                    </div>
                    {children && <p>{children}</p>}
                    {image && <img src={`/${image}`} alt={alt}/>}
                    {form && <ModalReviewForm/>}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

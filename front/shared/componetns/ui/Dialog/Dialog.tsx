import {Dialog as DialogBlock, DialogPanel, DialogTitle} from "@headlessui/react";
import styles from "./Dialog.module.scss"
import {CloseDialogButton} from "./CloseModalButton/CloseDialogButton";
import {ReactNode} from "react";

interface DialogProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    children?: string | ReactNode;
    isSuccessSubmitForm?: boolean
}

export function Dialog(props: DialogProps) {
    return (
        <DialogBlock open={props.isOpen} onClose={() => props.setIsOpen(false)} className={styles.dialog}>
            <div className={styles.background}>
                <DialogPanel className={styles.panel}>
                    {props.title && !props.isSuccessSubmitForm &&
                        <div className={styles.header}>
                            <DialogTitle className={styles.title}>{props.title}</DialogTitle>
                        </div>
                    }
                    <CloseDialogButton setIsOpen={props.setIsOpen}/>
                    {props.children}
                </DialogPanel>
            </div>
        </DialogBlock>
    )
}

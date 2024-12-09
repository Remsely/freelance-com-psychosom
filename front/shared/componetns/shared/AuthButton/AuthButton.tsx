"use client";

import styles from "./AuthButton.module.scss"
import {AuthForm} from "@/shared/componetns/shared/Forms";
import {useState} from "react";
import {Dialog} from "@/shared/componetns/ui";
import {LogIn} from "lucide-react";
import useDialogStore from "@/shared/stores/dialogStore";

export function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);
    const setTitle = useDialogStore((state) => state.setTitle);
    if (!isOpen) {
        setTitle("")
    }

    return (
        <>
            <LogIn className={styles.svg} onClick={() => setIsOpen(!isOpen)} width={24}/>
            {isOpen && <Dialog isOpen={isOpen}
                               setIsOpen={setIsOpen}><AuthForm/></Dialog> }
        </>
    );
}
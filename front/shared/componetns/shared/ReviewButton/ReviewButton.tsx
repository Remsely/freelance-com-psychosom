"use client";

import styles from "./ReviewButton.module.scss"
import {useEffect, useState} from "react";
import {Button} from "@/shared/componetns/ui";
import {AuthModalForm, ReviewModalForm} from "@/shared/componetns/shared/Forms";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {CircleAlert} from "lucide-react";

export function ReviewButton() {
    const [isOpen, setIsOpen] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('review') === 'true') {
            setIsOpen(true);
        }
    }, [isOpen]);

    const onOpen = () => {
        if (session) {
            setIsOpen(true)
        } else {
            setIsOpen(true)
            toast("Прежде чем оставить отзыв, пожалуйста, войдите в аккаунт", {
                icon: <CircleAlert/>,
                duration: 3000,
                className: styles.toast
            })
        }

    }

    return (
        <>
            <div className={styles.buttonWrapper}>
                <Button type="button" onClick={onOpen}>
                    Оставить отзыв
                </Button>
            </div>
            <ReviewModalForm isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    )
}

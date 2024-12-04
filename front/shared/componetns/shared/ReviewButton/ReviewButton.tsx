"use client";

import styles from "./ReviewButton.module.scss"
import {useEffect, useState} from "react";

import {Button} from "@/shared/componetns/ui";

import {ReviewForm} from "@/shared/componetns/shared/forms/Forms";
import {Dialog} from "@/shared/componetns/shared";

export function ReviewButton() {
    const [isOpenReviewModalForm, setIsOpenReviewModalForm] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('review') === 'true') {
            setIsOpenReviewModalForm(true);
        }
    }, []);

    return (
        <>
            <div className={styles.buttonWrapper}>
                <Button type="button" onClick={() => setIsOpenReviewModalForm(true)}>
                    Оставить отзыв
                </Button>
            </div>
            <Dialog isOpen={isOpenReviewModalForm}
                    setIsOpen={setIsOpenReviewModalForm}
                    title="Оставить отзыв"
                    isSuccessSubmitForm={isSuccess}>
                <ReviewForm setIsSuccess={setIsSuccess}/>
            </Dialog>
        </>
    )
}

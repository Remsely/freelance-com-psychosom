"use client";

import styles from "./ReviewButton.module.scss"
import {useEffect, useState} from "react";

import {ButtonMaster} from "@/shared/componetns/ui";

import {ReviewForm} from "@/shared/componetns/ui/forms/Forms";
import {PopupModal} from "@/shared/componetns/shared";

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
                <ButtonMaster className={styles.button} type="button" onClick={() => setIsOpenReviewModalForm(true)}>
                    Оставить отзыв
                </ButtonMaster>
            </div>

            <PopupModal isOpen={isOpenReviewModalForm}
                        setIsOpen={setIsOpenReviewModalForm}
                        title="Оставить отзыв"
                        isSuccessSubmitForm={isSuccess}>
                <ReviewForm setIsSuccess={setIsSuccess}/>
            </PopupModal>
        </>
    )
}

import styles from "./ReviewForm.module.scss"
import ButtonMaster from "../ButtonMaster/ButtonMaster.tsx";
import PopupModal from "../PopupModal/PopupModal.tsx";
import {useState} from "react";

export default function ReviewForm() {
    const [isOpenReviewForm, setIsOpenReviewForm] = useState(false);

    return (
        <>
            <div className={styles.button}>
                <ButtonMaster type="button" onClick={() => setIsOpenReviewForm(true)}>
                    Оставить отзыв
                </ButtonMaster>
            </div>

            <PopupModal isOpen={isOpenReviewForm} setIsOpen={setIsOpenReviewForm} form={true} title="Оставить отзыв"/>
        </>
    )
}
import ButtonMaster from "../ButtonMaster/ButtonMaster.tsx";
import PopupModal from "../PopupModal/PopupModal.tsx";
import { useState } from "react";

export default function ReviewForm() {
    const [isOpenReviewForm, setIsOpenReviewForm] = useState(false);

    return (
        <>
            <ButtonMaster type="button" onClick={() => setIsOpenReviewForm(true)}>
                Оставить отзыв
            </ButtonMaster>
            <PopupModal isOpen={isOpenReviewForm} setIsOpen={setIsOpenReviewForm} />
        </>
    )
}

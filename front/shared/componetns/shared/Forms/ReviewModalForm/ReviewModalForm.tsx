"use client";

import "./ReviewModalForm.scss";
import {Button, Dialog, DialogContent, DialogHeader, DialogTitle, StarRatingInput} from "@/shared/componetns";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {toast} from "react-hot-toast";
import {useSubmitReviewMutation} from "@/shared/hooks";

interface ReviewFormValues {
    rating: number;
    text: string;
}

interface ReviewModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    psychologistId: number;
}

const psychologistId = 1;

export function ReviewModalForm({ isOpen, onClose }: ReviewModalFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ReviewFormValues>({
        defaultValues: { rating: 0, text: "" }
    });

    const { submitReview, isSubmitting } = useSubmitReviewMutation({
        psychologistId,
        onSuccessCallback: () => setIsSubmitted(true),
    });

    const onSubmit = async (values: ReviewFormValues) => {
        if (values.rating < 1) {
            toast.error("Пожалуйста, выберите рейтинг");
            return;
        }
        submitReview(values);
    };

    const handleModalClose = () => {
        setIsSubmitted(false);
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleModalClose}>
            <DialogContent className="review-modal">
                <DialogHeader>
                    <DialogTitle>
                        {isSubmitted ? "Спасибо за отзыв!" : "Оставить отзыв"}
                    </DialogTitle>
                </DialogHeader>
                {!isSubmitted ? (
                    <form className="review-modal__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="review-modal__rating-row">
                            <label className="review-modal__label">Ваша оценка</label>
                            <Controller
                                control={control}
                                name="rating"
                                rules={{ min: 1, required: true }}
                                render={({ field }) => (
                                    <StarRatingInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        className={`review-modal__stars${errors.rating ? " review-modal__stars--error" : ""}`}
                                    />
                                )}
                            />
                            {errors.rating && (
                                <span className="review-modal__error-text">
                                  Пожалуйста, выберите рейтинг
                                </span>
                            )}
                        </div>
                        <div className="review-modal__field">
                            <label className="review-modal__label" htmlFor="review-text">
                                Ваш комментарий <span className="review-modal__label--optional">(необязательно)</span>
                            </label>
                            <Controller
                                control={control}
                                name="text"
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        id="review-text"
                                        className="review-modal__textarea"
                                        placeholder="Поделитесь впечатлениями о специалисте"
                                        rows={4}
                                        maxLength={500}
                                    />
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="review-modal__submit-btn"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        >
                            Оставить отзыв
                        </Button>
                    </form>
                ) : (
                    <div className="review-modal__success">
                        <div className="review-modal__success-icon">🎉</div>
                        <div className="review-modal__success-text">Спасибо за ваш отзыв! Мы очень ценим ваше мнение.</div>
                        <Button onClick={handleModalClose} className="review-modal__close-btn">
                            Закрыть
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
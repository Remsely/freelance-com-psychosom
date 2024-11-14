import styles from "./ReviewCard.module.scss";
import {Review} from "@/@types/types";
import {Star} from "lucide-react";

export function ReviewCard({name, star, message, date}: Review) {
    return (
        <>
            <div className={styles.review}>
                <div className={styles.info}>
                    <h3>{name}</h3>
                    <span>{star} </span><Star/>
                </div>
                <p>{message}</p>
                <h4>{date}</h4>
            </div>
        </>
    )
}

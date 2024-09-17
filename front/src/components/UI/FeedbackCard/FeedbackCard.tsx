import {Feedback} from "../../../../@types/types.ts";
import styles from "./FeedbackCard.module.scss";

export default function FeedbackCard({name, star, message, date}: Feedback) {
    return (
        <>
            <div className={styles.feedback}>
                <div className={styles.info}>
                    <h3>{name}</h3>
                    <span>{star} </span><img src="/public/star.svg" alt="Звезда"/>
                </div>
                <p>{message}</p>
                <h4>{date}</h4>
            </div>
        </>
    )
}

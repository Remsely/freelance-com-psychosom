"use client";

import styles from "./PsychologistsCatalog.module.scss";
import {usePsychologists} from "@/shared/hooks";
import {LoadingSpinner, PsychologistCard} from "@/shared/componetns";

export function PsychologistsCatalog() {
    const {psychologists, isLoading, isError} = usePsychologists();

    if (isLoading) return (
        <div className="loader-center-wrapper">
            <LoadingSpinner/>
        </div>
    )

    if (isError) return <p className={styles.error}>Не удалось загрузить данные 😔</p>;

    return (
        <section className={styles.psychologistsCatalog}>
            {psychologists?.map((p) => (
                <PsychologistCard key={p.id} profileImage={p.profileImage} id={p.id} firstName={p.firstName} lastName={p.lastName} rating={p.rating}/>
            ))}
        </section>
    );
}
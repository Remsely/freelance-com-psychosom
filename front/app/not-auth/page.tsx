import {Button} from "@/shared/componetns/ui";
import {ArrowLeft, X} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.scss";

export default function UnauthorizedPage() {
    return (
        <div className={`${styles.notFoundBlock} container`}>
            <div className={styles.info}>
                <div className={styles.titleBlock}>
                    <h2>Доступ запрещён</h2><X size={50}/>
                </div>
                <p className={styles.description}>
                    Данную страницу могут просматривать только авторизованные пользователи.
                </p>
                <div className={styles.buttonsContainer}>
                    <Link href="/">
                        <Button className={styles.button}>
                            <ArrowLeft/>
                            На главную
                        </Button>
                    </Link>
                    <a href="/profile">
                        <Button className={styles.button}>
                            Обновить
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
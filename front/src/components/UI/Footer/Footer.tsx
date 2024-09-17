import styles from "./Footer.module.scss"

export default function Footer() {
    return (
        <>
            <div className={styles.background}>
                <footer className={`${styles.footer} container`}>
                    <div>
                        <h1 className={styles.title}>НАЗВАНИЕ</h1>
                    </div>
                    <div className={styles.important}>
                        <h2>Важное</h2>
                        <ul>
                            <li><a href="#">Главная</a></li>
                            <li><a href="#consultation">Записаться на консультацию</a></li>
                            <li><a href="#feedbacks">Отзывы</a></li>
                        </ul>
                    </div>
                    <div className={styles.socials}>
                        <h2>Соцсети</h2>
                        <div className={styles.social}>
                            <img src="/telegram.svg" alt="telegram"/>
                            <span>psihosomatica</span>
                        </div>
                        <div className={styles.social}>
                            <img src="/whatsapp.svg" alt="whatsapp"/>
                            <span>8 (999)-888-77-66</span>
                        </div>
                        <div className={styles.social}>
                            <img src="/instagram.svg" alt="instagram"/>
                            <span>psihosomatica</span>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    )
}
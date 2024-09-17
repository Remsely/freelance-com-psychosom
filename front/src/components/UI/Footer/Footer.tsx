import styles from "./Footer.module.scss"

export default function Footer() {
    return (
        <>
            <hr className={styles.footer__hr}/>
            <footer className={`${styles.footer} container`}>
                <div className={styles.social}>
                    <img src="/telegram.svg" alt="telegram"/>
                    <span>sefghjkahjkl</span>
                </div>
                <div className={styles.social}>
                    <img src="/whatsapp.svg" alt="whatsapp"/>
                    <span>8 (999)-888-77-66</span>
                </div>
            </footer>
        </>
    )
}
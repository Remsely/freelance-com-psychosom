import styles from "./Footer.module.scss"
import ContactsBlock from "./ContactsBlock/ContactsBlock.tsx";
import Navbar from "../Navbar/Navbar";

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
                        <Navbar/>
                    </div>
                    <div className={styles.socials}>
                        <h2>Соцсети</h2>
                        <ContactsBlock image="telegram">psychosomatic</ContactsBlock>
                        <ContactsBlock image="whatsapp">8 (999)-888-77-66</ContactsBlock>
                        <ContactsBlock image="instagram">psychosomatic</ContactsBlock>
                    </div>
                </footer>
            </div>

        </>
    )
}
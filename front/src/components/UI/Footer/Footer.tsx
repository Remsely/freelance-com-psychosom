import styles from "./Footer.module.scss"
import SocialBlock from "./SocialBlock/SocialBlock";
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
                        <SocialBlock text="phychosomatic" image="telegram"/>
                        <SocialBlock text="8 (999)-888-77-66" image="whatsapp"/>
                        <SocialBlock text="phychosomatic" image="instagram"/>
                    </div>
                </footer>
            </div>

        </>
    )
}
import HighlightInfo from "../HighlightInfo/HighlightInfo.tsx";
import PopupModal from "../PopupModal/PopupModal.tsx";
import {useState} from "react";
import TextMain from "./TextMain/TextMain.tsx";
import PhotoMain from "./PhotoMain/PhotoMain.tsx";
import styles from "./Main.module.scss";

export default function Main() {
    const [isOpenCertificate, setIsOpenCertificate] = useState(false)

    return (
        <main className={`${styles.main} container`}>
            <div className={styles.description}>
                <TextMain text="Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста"/>
                <HighlightInfo text="Блок важное (сноска/заметка)
                    со ссылкой на инфу о психосоматике"/>
                <p>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                    текста Продолжается много текста Продолжается много текста Продолжается много текста
                    Продолжается много текста Продолжается много текста Продолжается много текста </p>
                <HighlightInfo text="<a id='important-link'>Инфа о дипломе</a>
                    кнопка, открывающая модальное окно с файлом диплома"
                                onLinkClick={() => setIsOpenCertificate(true)}/>
                <PopupModal isOpen={isOpenCertificate} setIsOpen={setIsOpenCertificate} image="certificate.jpg"/>
            </div>
            <PhotoMain image="specialist.jpg"/>
        </main>
    )
}

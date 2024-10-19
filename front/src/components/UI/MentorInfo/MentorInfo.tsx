import HighlightInfo from "../HighlightInfo/HighlightInfo.tsx";
import PopupModal from "../PopupModal/PopupModal.tsx";
import {useState} from "react";
import TextMentorInfo from "./TextMentorInfo/TextMentorInfo.tsx";
import PhotoMentorInfo from "./PhotoMentorInfo/PhotoMentorInfo.tsx";
import styles from "./MentorInfo.module.scss";

export default function MentorInfo() {
    const [isOpenCertificate, setIsOpenCertificate] = useState(false)

    return (
        <main className={`${styles.main} container`}>
            <div className={styles.description}>
                <TextMentorInfo text="Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста"/>
                <HighlightInfo text="Блок важное (сноска/заметка)
                    со ссылкой на инфу о психосоматике"/>
                <TextMentorInfo text="Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста"/>
                <HighlightInfo text="<a id='important-link'>Инфа о дипломе</a>
                    кнопка, открывающая модальное окно с файлом диплома"
                                onLinkClick={() => setIsOpenCertificate(true)}/>
                <PopupModal isOpen={isOpenCertificate} setIsOpen={setIsOpenCertificate} image="certificate.jpg"/>
            </div>
            <PhotoMentorInfo image="specialist.jpg"/>
        </main>
    )
}

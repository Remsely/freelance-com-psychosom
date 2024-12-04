"use client";

import {useState} from "react";
import styles from "./MentorInfo.module.scss";
import {HighlightInfo, PhotoMentorInfo, TextMentorInfo} from "@/shared/componetns/shared/MentorInfo/index";
import Image from "next/image";
import {Dialog} from "@/shared/componetns/shared";

export function MentorInfo() {
    const [isOpenCertificate, setIsOpenCertificate] = useState(false)

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <TextMentorInfo>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                    текста Продолжается много текста Продолжается много текста Продолжается много текста
                    Продолжается много текста Продолжается много текста Продолжается много текста</TextMentorInfo>
                <HighlightInfo>Блок важное (сноска/заметка) со ссылкой на инфу о психосоматике</HighlightInfo>
                <TextMentorInfo>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                    текста Продолжается много текста Продолжается много текста Продолжается много текста
                    Продолжается много текста Продолжается много текста Продолжается много текста</TextMentorInfo>
                <HighlightInfo onLinkClick={() => setIsOpenCertificate(true)}><a id='important-link'>Инфа о дипломе</a> кнопка,
                    открывающая модальное окно с файлом диплома</HighlightInfo>
                <Dialog isOpen={isOpenCertificate} setIsOpen={setIsOpenCertificate} > <Image src="/certificate.jpg" alt="" width={533} height={750}/> </Dialog>
            </div>
            <PhotoMentorInfo>specialist.jpg</PhotoMentorInfo>
        </main>
    )
}

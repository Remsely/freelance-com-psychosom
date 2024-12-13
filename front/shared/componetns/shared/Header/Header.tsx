"use client";

import styles from "./Header.module.scss"
import {AuthButton, Navbar} from "@/shared/componetns/shared";
import {useSession} from "next-auth/react";

export function Header() {
    const {data: session} = useSession();
    console.log(session, "999")

    return (
        <>
            <header id="head" className={`${styles.header} container`}>
                <h1 className={styles.title}>{session ? "Авторизирован" : "Не авторизирован"}</h1>
                <nav className={styles.navbar}>
                    <Navbar/>
                    <div className={styles.authButton}>
                        <AuthButton/>
                    </div>
                </nav>
            </header>
        </>
    )
}
"use client";

import styles from "./Header.module.scss"
import {AuthButton, Navbar} from "@/shared/componetns/shared";
import {useSession} from "next-auth/react";

export function Header() {
    const { data: session } = useSession();

    return (
        <>
            <header id="head" className={`${styles.header} container`}>
                <h1 className={styles.title}>{!session  ? "хелло" : "Psychosomatic"}</h1>
                <nav className={styles.navbar}>
                    <Navbar/>
                </nav>
                <AuthButton/>
            </header>
        </>
    )
}
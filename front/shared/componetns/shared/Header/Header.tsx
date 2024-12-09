"use client";

import styles from "./Header.module.scss"
import {AuthButton, Navbar} from "@/shared/componetns/shared";

export function Header() {
    return (
        <>
            <header id="head" className={`${styles.header} container`}>
                <h1 className={styles.title}>Psychosomatic</h1>
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
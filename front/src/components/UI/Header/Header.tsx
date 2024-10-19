import styles from "./Header.module.scss"
import NavBlock from "../NavBlock/NavBlock.tsx";

export default function Header() {
    return (
        <>
            <header className={`${styles.header} container`}>
                <h1 className={styles.title}>НАЗВАНИЕ</h1>
                <nav className={styles.navbar}>
                    <NavBlock/>
                </nav>
            </header>
        </>
    )
}
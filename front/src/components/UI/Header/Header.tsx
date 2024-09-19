import styles from "./Header.module.scss"

export default function Header() {
    return (
        <>
            <header className={`${styles.header} container`}>
                <h1 className={styles.title}>НАЗВАНИЕ</h1>
                <nav className={styles.navbar}>
                    <ul>
                        <li><a href="#">Главная</a></li>
                        <li><a href={"{#consultation}"}>Записаться на консультацию</a></li>
                        <li><a href={"#feedbacks"}>Отзывы</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
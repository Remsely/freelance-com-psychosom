import styles from "./PhotoMentorInfo.module.scss"

interface PhotoMainProps {
    children: string
}

export default function PhotoMentorInfo(children : PhotoMainProps) {
    return (
        <img className={styles.photo} src={`/${children}`} alt=""/>
    )
}

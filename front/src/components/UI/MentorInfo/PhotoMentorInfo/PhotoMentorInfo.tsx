import styles from "./PhotoMentorInfo.module.scss"

interface PhotoMainProps {
    image: string
}

export default function PhotoMentorInfo(props : PhotoMainProps) {
    return (
        <img className={styles.photo} src={`/${props.image}`} alt=""/>
    )
}

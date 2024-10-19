import styles from "./PhotoMain.module.scss"

interface PhotoMainProps {
    image: string
}

export default function PhotoMain(props : PhotoMainProps) {
    return (
        <img className={styles.photo} src={`/${props.image}`} alt=""/>
    )
}

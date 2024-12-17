import styles from "./PhotoMentorInfo.module.scss"
import Image from "next/image";

export function PhotoMentorInfo(props : {children: string}) {
    return (
        <Image className={styles.photo} src={`/${props.children}`} alt="" width={400} height={560} priority/>
    )
}

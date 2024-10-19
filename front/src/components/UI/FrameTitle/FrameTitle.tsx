import styles from "./FrameTitle.module.scss"

interface FrameTitleProps {
    title: string;
    id?: string;
}

export default function FrameTitle({ title, id } : FrameTitleProps) {
    return (
        <h1 className={`${styles.title_block} container`} id={id}>{title}</h1>
    )
}


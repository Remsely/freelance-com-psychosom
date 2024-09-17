import styles from "./TitleBlock.module.scss"

interface TitleBlockProps {
    title: string;
}

export default function TitleBlock({ title } : TitleBlockProps) {
    return (
        <h1 className={`${styles.title_block} container`}>{title}</h1>
    )
}


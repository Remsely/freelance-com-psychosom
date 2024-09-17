import styles from "./TitleBlock.module.scss"

interface TitleBlockProps {
    title: string;
    id?: string;
}

export default function TitleBlock({ title, id } : TitleBlockProps) {
    return (
        <h1 className={`${styles.title_block} container`} id={id}>{title}</h1>
    )
}


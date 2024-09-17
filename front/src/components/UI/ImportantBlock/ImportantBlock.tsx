import styles from "./ImportantBlock.module.scss"

interface ImportantBlockProps {
    text: string;
}

export default function ImportantBlock({ text }: ImportantBlockProps) {
    return (
        <div className={styles.important}>
            <p>{text}</p>
        </div>
    )
}

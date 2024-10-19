import styles from "./ContactsBlock.module.scss";

interface ContactsBlockProps {
    children: string;
    image: string;
}

export default function ContactsBlock(props : ContactsBlockProps) {

    return (
        <div className={styles.social}>
            <img src={`/${props.image}.svg`} alt=""/>
            <span>{props.children}</span>
        </div>
    );
}

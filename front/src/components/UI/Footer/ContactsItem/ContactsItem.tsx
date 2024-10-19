import styles from "./ContactsItem.module.scss";

interface ContactsBlockProps {
    children: string;
    image: string;
}

export default function ContactsItem(props : ContactsBlockProps) {

    return (
        <div className={styles.social}>
            <img src={`/${props.image}.svg`} alt=""/>
            <span>{props.children}</span>
        </div>
    );
}

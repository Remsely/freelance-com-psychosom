import styles from "./SocialBlock.module.scss";

interface SocialBlockProps {
    text: string;
    image: string;
}

export default function SocialBlock(props : SocialBlockProps) {

    return (
        <div className={styles.social}>
            <img src={`/${props.image}.svg`} alt=""/>
            <span>{props.text}</span>
        </div>
    );
}

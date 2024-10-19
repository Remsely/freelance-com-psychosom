import { useEffect } from 'react';
import styles from "./HighlightInfo.module.scss";

interface HighlightInfoProps {
    text: string;
    onLinkClick?: () => void;
}

export default function HighlightInfo(props: HighlightInfoProps) {
    useEffect(() => {
        if (props.onLinkClick) {
            const link = document.querySelector('#important-link');
            if (link) {
                link.addEventListener('click', props.onLinkClick);
            }

            return () => {
                if (link && props.onLinkClick) {
                    link.removeEventListener('click', props.onLinkClick);
                }
            };
        }
    }, [props.onLinkClick]);

    return (
        <div className={styles.highlight}>
            <p dangerouslySetInnerHTML={{ __html: props.text }}></p>
        </div>
    );
}

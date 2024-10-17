import { useEffect } from 'react';
import styles from "./HighlightInfo.module.scss";

interface HighlightInfoProps {
    text: string;
    onLinkClick?: () => void;
}

export default function HighlightInfo({ text, onLinkClick }: HighlightInfoProps) {
    useEffect(() => {
        if (onLinkClick) {
            const link = document.querySelector('#important-link');
            if (link) {
                link.addEventListener('click', onLinkClick);
            }

            return () => {
                if (link) {
                    link.removeEventListener('click', onLinkClick);
                }
            };
        }
    }, [onLinkClick]);

    return (
        <div className={styles.highlight}>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
    );
}

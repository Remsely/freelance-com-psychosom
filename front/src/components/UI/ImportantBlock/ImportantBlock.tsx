import { useEffect } from 'react';
import styles from "./ImportantBlock.module.scss";

interface ImportantBlockProps {
    text: string;
    onLinkClick?: () => void;
}

export default function ImportantBlock({ text, onLinkClick }: ImportantBlockProps) {
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
        <div className={styles.important}>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
    );
}

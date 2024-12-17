import styles from "./QRCodeSection.module.scss";
import useDialogStore from "@/shared/stores/dialogStore";
import { useEffect } from "react";
import {QRCodeSVG} from "qrcode.react";

export function QRCodeSection(props: { qrLink: string }) {
    const setTitle = useDialogStore((state) => state.setTitle);

    useEffect(() => {
        setTitle("Подтвердите аккаунт");
    }, [setTitle]);

    return (
        <div className={styles.block}>
            <h2>Подтвердите аккаунт через Telegram для получения уведомлений о записи и общения со специалистом, обязательно нажмите <b>/start</b></h2>
            <div>
                <QRCodeSVG className="qrCode" value={props.qrLink} size={350} fgColor={"#6E522D"} imageSettings={{
                    src: "/logo-without-bg.svg",
                    height: 60,
                    width: 60,
                    opacity: 1,
                    excavate: true,
                }}/>
            </div>
            <p>
                Сканируйте QR-код или перейдите по <a className={styles.link} href={props.qrLink} target="_blank"
                                       rel="noopener noreferrer">ссылке</a>
            </p>
        </div>
    );
}

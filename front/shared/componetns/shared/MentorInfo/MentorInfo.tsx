"use client";

import React, {useState} from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    HighlightInfo,
    PhotoMentorInfo,
    CertificatesInfo
} from "@/shared/componetns";
import "./MentorInfo.scss"
import {PsychologistProfileType} from "@/@types/types";

export function MentorInfo({specialist}: PsychologistProfileType) {
    const [openCertificate, setOpenCertificate] = useState(false);
    const [currentCertificate, setCurrentCertificate] = useState<string | null>(null);

    const handleOpenCertificate = (url: string) => {
        setCurrentCertificate(url);
        setOpenCertificate(true);
    };

    return (
        <div className="psychologist-profile">
            <div className="psychologist-profile__info">
                <div className="psychologist-profile__fio">
                    {specialist.firstName} {specialist.lastName}
                </div>
                {specialist.article.map((block, idx) => {
                    if (block.type === "tip") {
                        return (
                            <HighlightInfo key={idx}>{block.content}</HighlightInfo>
                        );
                    }
                    if (block.type === "paragraph") {
                        return (
                            <div className="psychologist-profile__paragraph" key={idx}>
                                {block.content}
                            </div>
                        );
                    }
                    return null;
                })}
                <CertificatesInfo certificates={specialist.educationFiles} handleOpenCertificate={handleOpenCertificate}/>
            </div>
            <PhotoMentorInfo specialist={specialist}/>
            <Dialog open={openCertificate} onOpenChange={() => setOpenCertificate(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Документ о квалификации</DialogTitle>
                        {currentCertificate && (
                            <Image
                                src={currentCertificate}
                                alt="Сертификат"
                                width={1200}
                                height={750}
                                style={{maxWidth: "100%", height: "auto", borderRadius: 12}}
                            />
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

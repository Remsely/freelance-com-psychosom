"use client";

import {AuthForm} from "./AuthForm/AuthForm";
import Image from "next/image"
import {useState} from "react";
import {PopupModal} from "@/shared/componetns/shared";

export function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Image src="/log-in.svg" alt="" onClick={() => setIsOpen(!isOpen)} width={24} height={24} />
            {isOpen && <PopupModal isOpen={isOpen} setIsOpen={setIsOpen}><AuthForm/></PopupModal> }
        </>
    );
}
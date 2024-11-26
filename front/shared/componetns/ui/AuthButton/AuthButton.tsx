"use client";

import {AuthForm} from "@/shared/componetns/shared/forms/Forms";
import {useState} from "react";
import {PopupModal} from "@/shared/componetns/shared";
import {LogIn} from "lucide-react";

export function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <LogIn onClick={() => setIsOpen(!isOpen)} width={24}/>
            {isOpen && <PopupModal isOpen={isOpen}
                                   setIsOpen={setIsOpen} title="Авторизация"><AuthForm/></PopupModal> }
        </>
    );
}
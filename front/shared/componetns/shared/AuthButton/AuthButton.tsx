"use client";

import {AuthForm} from "@/shared/componetns/shared/Forms";
import {useState} from "react";
import {Dialog} from "@/shared/componetns/ui";
import {LogIn} from "lucide-react";

export function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <LogIn onClick={() => setIsOpen(!isOpen)} width={24}/>
            {isOpen && <Dialog isOpen={isOpen}
                               setIsOpen={setIsOpen} title="Авторизация"><AuthForm/></Dialog> }
        </>
    );
}
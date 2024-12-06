'use client';

import { SessionProvider } from 'next-auth/react';
import {FC, PropsWithChildren} from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
        </>
    );
};
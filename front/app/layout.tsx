import type {Metadata} from "next";
import {Manrope} from 'next/font/google';
import {ReactNode} from "react";
import "@/shared/styles/index.scss"
import {Footer, Header, Providers} from "@/shared/componetns/shared";
import {Toaster} from "react-hot-toast";

const manrope = Manrope({
    subsets: ['cyrillic'],
    variable: '--font-manrope',
    weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
    title: "Психосоматика",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ru">
        <body className={`${manrope.variable} wrapper`}>
        <Providers>
            <Header/>
            {children}
            <Footer/>
        </Providers>
        <Toaster />
        </body>
        </html>
    );
}

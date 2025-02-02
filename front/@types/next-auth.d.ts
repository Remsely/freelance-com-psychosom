import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            firstname?: string | null;
            lastname?: string | null;
            phone?: string | null;
            telegram?: string | null;
            jwtToken?: string;
            webSocketToken?: string;
            accountConfirmationUrl?: string;
        } & DefaultSession["user"];
    }

    interface User {
        firstname?: string | null;
        lastname?: string | null;
        phone?: string | null;
        telegram?: string | null;
        jwtToken?: string;
        webSocketToken?: string;
        accountConfirmationUrl?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        jwtToken?: string;
        firstname?: string | null;
        lastname?: string | null;
        phone?: string | null;
        telegram?: string | null;
        webSocketToken?: string;
        accountConfirmationUrl?: string;
    }
}
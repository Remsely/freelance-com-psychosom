import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {SessionUser, Token, User} from "@/@types/types";
import {users} from "@/app/api/auth/users";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Local JSON Auth",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) : Promise<SessionUser | null> {
                const user = users.find(
                    (u : User) => u.email === (credentials as {email?: string}).email && u.password === credentials?.password
                );

                if (user) {
                    return { id: user.id, name: user.name, email: user.email };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                (token as Token).id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as SessionUser) = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                };
            }
            return session;
        },
    },
    secret: "super-secret-key",
    session: {
        strategy: "jwt",
    },
});
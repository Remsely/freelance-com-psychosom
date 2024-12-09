// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
//
// export const authOptions: AuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 identifier: { label: "Phone or Telegram", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials) throw new Error("Credentials not provided");
//
//                 const { identifier, password } = credentials;
//
//                 try {
//                     const response = await fetch("http://localhost:4000/api/auth/login", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ identifier, password }),
//                     });
//
//                     if (!response.ok) throw new Error("Invalid credentials");
//
//                     const user = await response.json();
//
//                     if (user && user.id && user.jwtToken) {
//                         return {
//                             id: user.id,
//                             name: user.name || null, // Если name нет, то null
//                             email: user.email || null, // Если email нет, то null
//                             jwtToken: user.jwtToken,
//                         };
//                     }
//
//                     throw new Error("Invalid user data");
//                 } catch (error) {
//                     console.error("Authorize error:", error);
//                     throw new Error("Authorization failed");
//                 }
//             },
//         }),
//     ],
//     pages: {
//         signIn: "/auth/signin",
//         error: "/auth/error",
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.jwtToken = user.jwtToken;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user = {
//                     id: token.id,
//                     name: token.name || null,
//                     email: token.email || null,
//                     jwtToken: token.jwtToken,
//                 };
//             }
//             return session;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };
//
// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);

import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
    access_token: string;
}

interface CustomSession extends Session {
    user: {
        accessToken: string;
    } & Session['user'];
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Your Name' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                });
                const user: CustomUser = await res.json();
                if (res.ok && user.access_token) {
                    return user;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/',
        error: '/',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as CustomUser;
                token.accessToken = customUser.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession: CustomSession = {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken as string,
                },
            };
            return customSession;
        },
    },
};

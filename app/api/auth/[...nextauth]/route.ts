// app/api/auth/[...nextauth]/route.ts

import NextAuth, {User, SessionStrategy} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Sign-in triggered with credentials:", credentials);

                // Simulate a user object for testing purposes
                if (credentials?.username === "test" && credentials?.password === "password") {
                    return { id: "1", name: "Test User", email: "test@example.com" };
                }

                // Return null to signify login failure
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user }: {user: User}) {
            console.log("Sign-in callback triggered for user:", user);
            return true; // Allow the sign-in
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as SessionStrategy, // Use JWT for sessions
    },
};


export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

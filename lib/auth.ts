import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {AuthOptions} from "next-auth";

export const authOptions: AuthOptions = {
    // --- Use the correct adapter instance ---
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials){ // Return augmented User type
                // ... (rest of your authorize logic - unchanged)
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter email and password.');
                }
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || !user.password) {
                    throw new Error('Invalid credentials or sign-in method.');
                }
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error('Incorrect password.');
                }
                return { id: user.id, name: user.name, email: user.email, role: user.role };
            },
        }),
    ],

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        // --- Corrected signIn signature for ESLint ---
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async signIn({ user, account: _account, profile: _profile, email: _email, credentials: _credentials }) {
            console.log('SignIn callback executed for:', user.email);
            // Add potential checks using 'user' here if needed in the future
            return true; // Allow the sign-in
        },

        async jwt({ token, user }) {
            if (user) {
                // --- Ensure ID is number ---
                token.id = Number(user.id);
                token.role = user.role; // user.role comes from authorize return
                token.name = user.name;
                token.email = user.email;
                // token.picture = user.image;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                // --- Ensure ID is number (explicit cast if needed) ---
                session.user.id = Number(token.id);
                session.user.role = token.role;
                session.user.name = token.name ?? session.user.name;
                session.user.email = token.email ?? session.user.email;
                // session.user.image = token.picture ?? session.user.image;
            } else {
                console.error("Session callback: Token or session.user is missing!", {token, sessionUser: session.user});
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            return url.startsWith('/') ? `${baseUrl}${url}` : url;
        }
    },

    pages: {
        signIn: '/auth/signin',
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};
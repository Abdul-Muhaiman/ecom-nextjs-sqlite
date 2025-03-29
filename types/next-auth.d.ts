import "next-auth";
import "next-auth/jwt";
import {User as NextAuthUser} from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            role: string;
        } & NextAuthUser;
    }
    interface User { // No 'extends NextAuthUser' here
        id: number;
        role: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        id: number;
        role: string;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
    }
}

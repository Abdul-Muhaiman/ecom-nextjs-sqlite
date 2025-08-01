import React from "react";
import Sidebar from "@/app/dashboard/components/Sidebar";
import {getServerSession} from "next-auth";
import Link from "next/link";
import {SessionProvider} from "@/context/SessionContext";
import {authOptions} from "@/lib/auth";

interface Session {
    user: User;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default async function DashboardLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className={"flex flex-col items-center justify-center h-screen"}>
                <p className={"text-3xl mb-3 text-gray-700"}>Login to see your profile</p>
                <Link href={'/login'} className={"text-blue-500 text-2xl underline underline-offset-2"}>Go to
                    login</Link>
            </div>
        );
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content Area */}
            <SessionProvider session={session as Session}>
                <main className="flex-1 bg-gray-50 p-10">
                    {children}
                </main>
            </SessionProvider>
        </div>
    );
}
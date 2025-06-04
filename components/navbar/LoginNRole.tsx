"use client"

import Link from "next/link";
import { User as UserIcon, LucideUserRoundPen } from "lucide-react";
import {useSession} from "next-auth/react";

export default function LoginNRole() {
    const session = useSession();

    return <>
        {session.data?.user ? (
            <div className={"flex space-x-4"}>
                <Link href="/dashboard">
                    <div
                        className="bg-green-500 text-white border-2 border-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-md transition duration-300 hover:bg-green-600">
                        <UserIcon className="w-5 h-5"/>
                    </div>
                </Link>
                {session.data?.user.role === "admin" ?
                    (
                        <Link href="/admin">
                            <div
                                className="bg-red-500 text-white border-2 border-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-md transition duration-300 hover:bg-green-600">
                                <LucideUserRoundPen className="w-5 h-5"/>
                            </div>
                        </Link>
                    ) : null
                }
            </div>
        ) : (
            <Link href="/login">
                <button
                    className="bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
                >
                    Login
                </button>
            </Link>
        )}
    </>;
}
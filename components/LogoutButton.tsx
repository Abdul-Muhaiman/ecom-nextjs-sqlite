"use client"

import {signOut} from "next-auth/react";

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut({redirect: true, callbackUrl: "/"});
        localStorage.clear();
        sessionStorage.clear();
    }

    return <button
        onClick={handleLogout}
        className={"w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"}
    >
        Logout
    </button>;
}


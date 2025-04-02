"use client"

import {signOut} from "next-auth/react";

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut({redirect: true, callbackUrl: "/"});
        localStorage.clear();
    }

    return <button
        onClick={handleLogout}
        className={"bg-red-500 px-4 py-2 text-white rounded-lg mt-4"}
    >Logout</button>;
}


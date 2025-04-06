"use client"

import {signOut} from "next-auth/react";
import React from "react";

export default function LogoutButton(
    {children, style}: { children: React.ReactNode, style?: string }
) {
    const handleLogout = async () => {
        await signOut({redirect: true, callbackUrl: "/"});
        localStorage.clear();
        sessionStorage.clear();
    }

    return <button
        onClick={handleLogout}
        className={style}
    >
        {children}
    </button>;
}


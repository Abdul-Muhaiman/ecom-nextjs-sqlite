'use client';

import React from 'react';
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

const sidebarContent = [
    {title: "Dashboard", href: "/dashboard"},
    {title: "Orders", href: "/dashboard/orders"},
    {title: "Referral", href: "/dashboard/referral"},
];

export default function Sidebar() {

    return (
        <div className="h-auto w-64 bg-gray-800 text-white flex flex-col">
            {/* Logo/Title */}
            <div className="p-4 text-center text-xl font-bold border-b border-gray-600">
                My Profile
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4">
                <ul className={"flex flex-col space-y-4"}>
                    {sidebarContent.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={"cursor-pointer p-2 rounded-md hover:bg-gray-700"}
                        >
                            {item.title}
                        </Link>
                    ))}
                </ul>
                <div className="p-4 border-t border-gray-600 mt-2">
                    <LogoutButton />
                </div>
            </nav>
        </div>
    );
}

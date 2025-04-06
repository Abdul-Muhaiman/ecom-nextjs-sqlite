"use client";

import {ArrowLeft, Box, ClipboardList, Users} from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function Sidebar() {
    return (
        <aside className="bg-blue-600 text-white w-64 min-h-screen p-6 flex flex-col space-y-6">
            <Link href={"/dashboard"}>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            </Link>
            <nav className="flex flex-col space-y-4">
                {/* Users Section */}
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <Users className="w-5 h-5"/>
                    Profile
                </Link>

                {/* Products Section */}
                <Link
                    href="/dashboard/orders"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <Box className="w-5 h-5"/>
                    Orders
                </Link>

                {/* Categories Section */}
                <Link
                    href="/dashboard/referral"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <ClipboardList className="w-5 h-5"/>
                    Referrals
                </Link>
                <LogoutButton style="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md">
                    <ArrowLeft className="w-5 h-5"/>
                    Logout
                </LogoutButton>
            </nav>
        </aside>
    );
}

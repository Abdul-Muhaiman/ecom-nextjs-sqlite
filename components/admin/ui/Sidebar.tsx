"use client";

import {Box, ClipboardList, DollarSign, Gift, Grid, Users} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="bg-blue-600 text-white w-64 min-h-screen p-6 flex flex-col space-y-6">
            <Link href={"/admin"}>
                <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
            </Link>
            <nav className="flex flex-col space-y-4">
                {/* Users Section */}
                <Link
                    href="/admin/users"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <Users className="w-5 h-5"/>
                    Users
                </Link>

                {/* Products Section */}
                <Link
                    href="/admin/products"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <Box className="w-5 h-5"/>
                    Products
                </Link>

                {/* Categories Section */}
                <Link
                    href="/admin/categories"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <Grid className="w-5 h-5"/>
                    Categories
                </Link>

                {/* Orders Section */}
                <Link
                    href="/admin/orders"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <ClipboardList className="w-5 h-5"/>
                    Orders
                </Link>

                {/* Referrals Section */}
                <Link
                    href="/admin/referrals"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <Gift className="w-5 h-5"/>
                    Referrals
                </Link>

                {/* Commissions Section */}
                <Link
                    href="/admin/commissions"
                    className="flex items-center gap-3 hover:bg-blue-700 transition px-3 py-2 rounded-md"
                >
                    <DollarSign className="w-5 h-5"/>
                    Commissions
                </Link>
            </nav>
        </aside>
    );
}

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, ShoppingCart, Info, Mail, User } from "lucide-react";

const navbarContent = [
    { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { title: "Products", href: "/products", icon: <ShoppingCart className="w-5 h-5" /> },
    { title: "About", href: "#", icon: <Info className="w-5 h-5" /> },
    { title: "Contact", href: "#", icon: <Mail className="w-5 h-5" /> },
];

export default function Navbar() {
    const session = useSession();

    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
                    <span className="text-2xl font-bold tracking-wide">EcomShop</span>
                </Link>

                {/* Navigation Links */}
                <nav className="md:ml-auto flex items-center space-x-8">
                    {navbarContent.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300"
                        >
                            {link.icon}
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center space-x-6 ml-6">
                    {/* Cart Button */}
                    <Link href="/cart">
                        <button
                            className="flex items-center gap-2 bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Cart
                        </button>
                    </Link>

                    {/* Conditional Login/Dashboard Button */}
                    {session?.data?.user ? (
                        <Link href="/dashboard">
                            <div className="bg-green-500 text-white border-2 border-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-md transition duration-300 hover:bg-green-600">
                                <User className="w-5 h-5" />
                            </div>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <button
                                className="bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
                            >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

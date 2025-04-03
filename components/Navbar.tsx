import Link from "next/link";
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const navbarContent = [
    {title: "Home", href: "/"},
    {title: "Products", href: "/products"},
    {title: "About", href: "#"},
    {title: "Contact", href: "#"},
];

export default async function Navbar() {
    // Fetch session on the server-side
    const session = await getServerSession(authOptions);

    return (
        <header className="bg-gray-800 text-gray-100 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
                >
                    <span className="ml-1.5 pt-1 text-xl text-white">EcomShop</span>
                </Link>

                {/* Navigation Links */}
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {navbarContent.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="mr-5 text-gray-400 hover:text-white"
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>

                {/* Cart Dropdown */}
                <div className="flex items-center space-x-4 relative">

                    {/* Login Button */}
                    <Link href="/cart">
                        <button
                            className="bg-gray-900 hover:bg-gray-700 border-1 text-white py-1 px-3 rounded focus:outline-none">
                            Cart
                        </button>
                    </Link>
                    {session?.user?
                    <Link href="/dashboard">
                        <span className={"bg-red-500 border-white border-2 w-8 h-8 rounded-4xl block text-center text-lg"}>D</span>
                    </Link>
                        : <Link href="/login">
                        <button
                            className="bg-gray-900 hover:bg-gray-700 border-1 text-white py-1 px-3 rounded focus:outline-none">
                            Login
                        </button>
                    </Link>}
                </div>
            </div>
        </header>
    );
}

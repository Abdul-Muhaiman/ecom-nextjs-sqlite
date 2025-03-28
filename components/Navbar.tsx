"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

const navbarContent = [
    {title: "Home", href: "/"},
    {title: "Products", href: "/products"},
    {title: "About", href: "#"},
    {title: "Contact", href: "#"},
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="bg-gray-800 text-gray-100 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link
                    href={"/"}
                    className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
                >
                    <span className="ml-1.5 pt-1 text-xl text-white">EcomShop</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {navbarContent.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (pathname.startsWith(link.href) && link.href !== "/");
                        return (
                            <Link
                                key={link.title}
                                href={link.href}
                                className={`mr-5 ${isActive ? "text-white underline underline-offset-4" : "text-gray-400 hover:text-white"}`}
                            >
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center space-x-4">
                    <Link href={"/cart"}>
                        <button
                            className="bg-gray-900 hover:bg-gray-700 border-1 text-white py-1 px-3 rounded focus:outline-none mt-4 md:mt-0">
                            Cart
                        </button>
                    </Link>

                    <Link href={"/login"}>
                        <button
                            className="bg-gray-900 hover:bg-gray-700 border-1 text-white py-1 px-3 rounded focus:outline-none mt-4 md:mt-0">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
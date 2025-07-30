// import Link from "next/link";
// import { Home, ShoppingCart, Info, Mail, } from "lucide-react";
// import LoginNRole from "@/components/navbar/LoginNRole";
//
// const navbarContent = [
//     { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
//     { title: "Products", href: "/products", icon: <ShoppingCart className="w-5 h-5" /> },
//     { title: "About", href: "#", icon: <Info className="w-5 h-5" /> },
//     { title: "Contact", href: "#", icon: <Mail className="w-5 h-5" /> },
// ];
//
// export default function Navbar() {
//     return (
//         <header className="bg-blue-600 text-white shadow-lg">
//             <div className="container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center">
//                 {/* Logo */}
//                 <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
//                     <span className="text-2xl font-bold tracking-wide">EcomShop</span>
//                 </Link>
//
//                 {/* Navigation Links */}
//                 <nav className="md:ml-auto flex items-center space-x-8">
//                     {navbarContent.map((link) => (
//                         <Link
//                             key={link.title}
//                             href={link.href}
//                             className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300"
//                         >
//                             {link.icon}
//                             <span>{link.title}</span>
//                         </Link>
//                     ))}
//                 </nav>
//
//                 {/* User Actions */}
//                 <div className="flex items-center space-x-6 ml-6">
//                     {/* Cart Button */}
//                     <Link href="/cart">
//                         <button
//                             className="flex items-center gap-2 bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
//                         >
//                             <ShoppingCart className="w-5 h-5"/>
//                             Cart
//                         </button>
//                     </Link>
//
//                     {/* Conditional Login/Dashboard Button */}
//                     <LoginNRole />
//                 </div>
//             </div>
//         </header>
//     );
// }
// import Link from "next/link";
// import { Home, ShoppingCart, Info, Mail, } from "lucide-react";
// import LoginNRole from "@/components/navbar/LoginNRole";
//
// const navbarContent = [
//     { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
//     { title: "Products", href: "/products", icon: <ShoppingCart className="w-5 h-5" /> },
//     { title: "About", href: "#", icon: <Info className="w-5 h-5" /> },
//     { title: "Contact", href: "#", icon: <Mail className="w-5 h-5" /> },
// ];
//
// export default function Navbar() {
//     return (
//         <header className="bg-blue-600 text-white shadow-lg">
//             <div className="container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center">
//                 {/* Logo */}
//                 <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
//                     <span className="text-2xl font-bold tracking-wide">EcomShop</span>
//                 </Link>
//
//                 {/* Navigation Links */}
//                 <nav className="md:ml-auto flex items-center space-x-8">
//                     {navbarContent.map((link) => (
//                         <Link
//                             key={link.title}
//                             href={link.href}
//                             className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300"
//                         >
//                             {link.icon}
//                             <span>{link.title}</span>
//                         </Link>
//                     ))}
//                 </nav>
//
//                 {/* User Actions */}
//                 <div className="flex items-center space-x-6 ml-6">
//                     {/* Cart Button */}
//                     <Link href="/cart">
//                         <button
//                             className="flex items-center gap-2 bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
//                         >
//                             <ShoppingCart className="w-5 h-5"/>
//                             Cart
//                         </button>
//                     </Link>
//
//                     {/* Conditional Login/Dashboard Button */}
//                     <LoginNRole />
//                 </div>
//             </div>
//         </header>
//     );
// }

"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, ShoppingCart, Info, Mail, User, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const navbarContent = [
    { title: "Home", href: "/", icon: Home },
    { title: "Products", href: "/products", icon: ShoppingCart },
    { title: "About", href: "#", icon: Info },
    { title: "Contact", href: "#", icon: Mail },
];

export default function Navbar() {
    const session = useSession();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    EcomShop
                </Link>

                {/* Navigation */}
                <nav className="flex space-x-6">
                    {navbarContent.map(({ title, href, icon: Icon }) => (
                        <Link
                            key={title}
                            href={href}
                            className={cn("flex items-center gap-2 text-gray-700 hover:text-blue-600 transition")}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{title}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    {/* Cart Button */}
                    <Link href="/cart">
                        <Button variant="outline">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Cart
                        </Button>
                    </Link>

                    {/* User Dropdown */}
                    {session.data?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    <User className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                {session.data?.user.role === "admin" && (
                                    <DropdownMenuItem>
                                        <Link href="/admin">Admin Panel</Link>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button>
                                <LogIn className="w-5 h-5 mr-2" />
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

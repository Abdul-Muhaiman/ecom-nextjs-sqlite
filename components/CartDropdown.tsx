"use client";

import Link from "next/link";

export default function CartDropdown() {


    return (
        <div className="relative">
            <Link href={"/cart"}>
                <button
                    className="bg-gray-900 hover:bg-gray-700 border-1 text-white py-1 px-3 rounded focus:outline-none"
                >
                    Cart
                </button>
                <span className="absolute -top-2 -right-2 bg-red-500  text-xs font-bold px-2 py-1 rounded-full">
            </span>
            </Link>
        </div>
    );
}

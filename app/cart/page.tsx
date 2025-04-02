"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Image from "next/image";
import Placeholder from "@/public/placeholder.png"
import DeleteButton from "@/app/cart/components/DeleteButton"
import ClearCartButton from "@/app/cart/components/ClearCartButton";

interface cartItems {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

export default function CartPage() {
    const {data: session, status} = useSession();
    const [cartItems, setCartItems] = useState<cartItems[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (status === "authenticated" && session?.user?.id) {
                try {
                    const response = await fetch(`/api/cart/${session.user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch cart items");
                    }
                    const data = await response.json();
                    setCartItems(data); // Set cart items from the API response
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                } finally {
                    setIsLoading(false); // Stop loading regardless of success or failure
                }
            }
        };

        fetchCartItems();
    }, [session, status]);

    if (status === "loading" || isLoading) {
        return <div className="text-center py-12">Loading...</div>; // Show a loading indicator while fetching data
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center py-4 border-b border-gray-200"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={item.productImage || Placeholder}
                                            alt={item.productName}
                                            fill
                                            className="object-contain rounded-md"
                                            sizes="100vw"
                                        />
                                    </div>
                                    {/* Product Details */}
                                    <div className="ml-4 flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.productName}
                                        </h3>
                                        <p className="text-gray-600">
                                            ${item.productPrice.toFixed(2)}
                                        </p>
                                        {/* Quantity Controls */}
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300">
                                                -
                                            </button>
                                            <span className="mx-4 text-lg">{item.quantity}</span>
                                            <button
                                                className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {/* Item Total Price */}
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-800">
                                            ${(item.productPrice * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    {/* Delete Button */}
                                    <DeleteButton
                                        userId={session?.user.id as number}
                                        productId={item.productId}
                                        setCartItems={setCartItems} // Pass down setCartItems
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Your cart is empty!</p>
                        )}

                        {/* Continue Shopping & Clear Cart Buttons */}
                        <div className="mt-6 flex justify-between items-center">
                            <Link
                                href="/products"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                Continue Shopping
                            </Link>
                            {cartItems.length > 0 && (
                                <ClearCartButton userId={session?.user.id as number} setCartItems={setCartItems} />
                            )}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Order Summary
                        </h2>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-gray-800 font-bold">Subtotal</span>
                            <span className="text-gray-800 font-bold">
                $
                                {cartItems
                                    .reduce(
                                        (total, item) => total + item.productPrice * item.quantity,
                                        0
                                    )
                                    .toFixed(2)}
              </span>
                        </div>
                        <button
                            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

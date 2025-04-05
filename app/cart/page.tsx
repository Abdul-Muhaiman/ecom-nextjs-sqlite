"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCartItemsAction } from "@/lib/actions/cart";
import { GetCartProduct } from "@/types/cart";
import ClearCartButton from "@/components/cart/ClearCartButton";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

export default function Page() {
    const [cartItems, setCartItems] = useState<GetCartProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCartItems = async () => {
            setIsLoading(true);
            try {
                const cart: GetCartProduct[] = await getCartItemsAction();
                setCartItems(cart);
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("Failed to load cart items. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
                <p className="ml-4 text-gray-600">Loading your cart...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12 text-red-500">
                <XCircle className="w-10 h-10 mr-2" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-12">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cart Items Section */}
                    <div className="flex-1">
                        {cartItems.length > 0 ? (
                            <div className="bg-white shadow-lg rounded-xl p-8">
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <CartItem key={item.productId} item={item} setCartItems={setCartItems} />
                                    ))}
                                </div>
                                {/* Continue Shopping & Clear Cart Buttons */}
                                <div className="mt-10 flex justify-between items-center">
                                    <Link
                                        href="/products"
                                        className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 inline-flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Continue Shopping
                                    </Link>
                                    {cartItems.length > 0 && (
                                        <ClearCartButton setCartItems={setCartItems} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                                <p className="text-gray-500 text-lg mb-6">Your cart is empty! 😢</p>
                                <Link
                                    href="/products"
                                    className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 inline-flex items-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Browse Products
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full lg:w-1/3">
                        <OrderSummary cartItems={cartItems} router={router} />
                    </div>
                </div>
            </div>
        </div>
    );
}




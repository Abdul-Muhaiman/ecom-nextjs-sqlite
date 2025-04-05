"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import { getCartItemsAction} from "@/lib/actions/cart";
import { GetCartProduct } from "@/types/cart";
import OrderSummary from "@/components/cart/OrderSummary";
import ClearCartButton from "@/components/cart/ClearCartButton";
import CartItem from "@/components/cart/CartItem";

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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                <p className="ml-4 text-gray-600">Loading your cart...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-800 mb-12 tracking-tight">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items Section */}
                    <div className="flex-1 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-gray-100">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <CartItem key={item.productId} item={item} setCartItems={setCartItems} />
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-lg mb-4">Your cart is empty! 😢</p>
                                <Link
                                    href="/products"
                                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 inline-flex items-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Browse Products
                                </Link>
                            </div>
                        )}

                        {/* Continue Shopping & Clear Cart Buttons */}
                        <div className="mt-8 flex justify-between items-center">
                            <Link
                                href="/products"
                                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 inline-flex items-center gap-2"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                                Continue Shopping
                            </Link>
                            {cartItems.length > 0 && (
                                <ClearCartButton setCartItems={setCartItems} />
                            )}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <OrderSummary cartItems={cartItems} router={router} />
                </div>
            </div>
        </div>
    );
}




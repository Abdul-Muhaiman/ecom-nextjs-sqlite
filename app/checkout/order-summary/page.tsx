"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, Loader2, MapPin, ShoppingCart, XCircle } from 'lucide-react';
// Import context hook and Address type
import { useAddress } from '@/context/AddressContext'; // Adjust import path if needed
import Placeholder from "@/public/placeholder.png";
import { GetCartProduct } from "@/types/cart";
import { getCartItemsAction } from "@/lib/actions/cart";
import { createOrderAction } from "@/lib/actions/orders";
import { useRouter } from "next/navigation"; // Assuming you have this placeholder

// --- Utility Function ---
const cn = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
};

export default function OrderSummaryPage() {

    // Get address from context
    const { shippingAddress } = useAddress(); // Use the context hook

    const [cartItems, setCartItems] = useState<GetCartProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('payOnDelivery'); // Default to enabled option
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // --- Fetch Cart Items Effect ---
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

    // --- Calculations ---
    const calculateSubtotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.productPrice * item.quantity,
            0
        );
    };

    const subtotal = calculateSubtotal();
    // Add logic for shipping cost if applicable, otherwise 0
    const tax = 5.0;
    const shipping = 10;
    const total = subtotal + shipping + tax;

    // --- Event Handlers ---
    const handlePlaceOrder = async () => {
        if (!shippingAddress || cartItems.length === 0 || !selectedPaymentMethod) {
            alert("Please ensure address is selected, cart is not empty, and payment method is chosen.");
            return;
        }
        setIsPlacingOrder(true);

        try {
            const { message, orderId } = await createOrderAction();
            alert(`Order created successfully! ID: ${orderId}`);
            router.replace("/")
            return message;
        } catch (error) {
            console.error(error);
            setError("Failed to create order. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }

    };

    // --- Loading and Empty States ---
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
                <p className="ml-4 text-gray-600">Loading Summary...</p>
            </div>
        );
    }


    if (cartItems.length === 0 && !isLoading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
                <Link
                    href="/products"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // --- Render Page ---
    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Summary</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Address and Items */}
                    <div className="flex-1 space-y-6">
                        {/* Shipping Address Section */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
                                    <p className="text-gray-500 text-sm">
                                        {shippingAddress && (shippingAddress.street || shippingAddress.fullName)
                                            ? "Selected Shipping Address"
                                            : "No address selected"
                                        }
                                    </p>
                                </div>
                                <Link
                                    href="/checkout/address" // Link back to address selection/edit page
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Change
                                </Link>
                            </div>
                            {shippingAddress && (shippingAddress.street || shippingAddress.fullName) ? ( // Check if address has some data
                                <div className="text-gray-700 space-y-1">
                                    <p className="font-semibold">{shippingAddress.fullName}</p>
                                    <p>{shippingAddress.street}</p>
                                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                                    <p>{shippingAddress.country}</p>
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No shipping address selected.
                                    <Link
                                        href="/checkout/address"
                                        className="text-blue-600 hover:text-blue-800 ml-1 inline-flex items-center gap-1"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Add Address
                                    </Link>
                                </p>
                            )}
                        </div>

                        {/* Cart Items Summary Section */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Items in Cart</h2>
                            <p className="text-gray-500 text-sm mb-4">Review the items in your cart</p>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.productId} className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.productImage || Placeholder}
                                                alt={item.productName}
                                                fill
                                                sizes="100vw"
                                                className="object-contain rounded"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-md font-semibold text-gray-900">{item.productName}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right text-md font-semibold text-gray-900">
                                            ${(item.productPrice * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Totals and Payment */}
                    <div className="w-full lg:w-1/3">
                        <div className="space-y-6 sticky top-20">
                            {/* Order Totals */}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Totals</h2>
                                <p className="text-gray-500 text-sm mb-4">Order summary details</p>
                                <div className="space-y-2 border-b border-gray-200 pb-4 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-900 font-semibold">{shipping > 0 ? 'Free' : `$${shipping}`}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-gray-900 text-lg font-bold">Total</span>
                                    <span className="text-gray-900 text-lg font-bold">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                                <p className="text-gray-500 text-sm mb-4">Choose your payment method</p>
                                <div className="space-y-4">
                                    {/* Credit Card (Disabled) */}
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="creditCard"
                                            name="paymentMethod"
                                            value="creditCard"
                                            checked={selectedPaymentMethod === 'creditCard'}
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            disabled
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-not-allowed"
                                        />
                                        <label
                                            htmlFor="creditCard"
                                            className="ml-3 text-gray-500 cursor-not-allowed opacity-50"
                                        >
                                            Credit Card (Unavailable)
                                        </label>
                                    </div>

                                    {/* Pay on Delivery (Enabled) */}
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="payOnDelivery"
                                            name="paymentMethod"
                                            value="payOnDelivery"
                                            checked={selectedPaymentMethod === 'payOnDelivery'}
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="payOnDelivery" className="ml-3 text-gray-900">Pay on Delivery</label>
                                    </div>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!shippingAddress || cartItems.length === 0 || !selectedPaymentMethod || isPlacingOrder}
                                className={cn(
                                    "w-full py-3 text-white font-semibold rounded-md transition-colors",
                                    (!shippingAddress || cartItems.length === 0 || !selectedPaymentMethod || isPlacingOrder)
                                        ? 'bg-gray-400 cursor-not-allowed opacity-70' // Disabled state
                                        : 'bg-blue-600 hover:bg-blue-700' // Enabled state
                                )}
                            >
                                {isPlacingOrder ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Placing Order...
                                    </div>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
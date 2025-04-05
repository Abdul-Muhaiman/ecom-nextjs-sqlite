import {GetCartProduct} from "@/types/cart";
import {useRouter} from "next/navigation";
import React from "react";

export default function OrderSummary({
                          cartItems,
                          router,
                      }: {
    cartItems: GetCartProduct[];
    router: ReturnType<typeof useRouter>;
}) {
    const subtotal = cartItems.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
    );
    const tax = 5.0;
    const shipping = 10.0;

    return (
        <div className="w-full lg:w-1/3 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Order Summary</h2>
            <div className="space-y-3">
                <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-800 font-medium">Subtotal</span>
                    <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="text-gray-600">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-400 font-bold pt-4">
                    <span className="text-gray-800 text-lg">Total</span>
                    <span className="text-gray-800 text-lg">${(subtotal + tax + shipping).toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={() => router.push("/checkout/address")}
                className="mt-8 w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
                Proceed to Checkout
            </button>
        </div>
    );
}
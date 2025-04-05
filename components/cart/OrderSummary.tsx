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
    const total = subtotal + tax + shipping;

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Order Summary</h2>
            <div className="space-y-4">
                <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-800">Subtotal</span>
                    <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="text-gray-600">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-400 font-bold text-lg pt-3">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={() => router.push("/checkout/address")}
                className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
            >
                Proceed to Checkout
            </button>
        </div>
    );
}

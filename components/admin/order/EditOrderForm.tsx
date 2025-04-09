"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner"; // For toast notifications
import { useActionState } from "react"; // Hook for server action handling
import { Edit3 } from "lucide-react";
import { updateOrderDetailsAction } from "@/lib/actions/admin/order"; // Icon for the button

type InitialValues = {
    id: number;
    createdAt: Date;
    userId: number;
    amount: number;
    status: string;
    items: Array<{
        orderId: number;
        quantity: number;
        product: {
            name: string;
            id: number;
            price: number;
        };
    }>;
};

// Define the initial state for toast notifications
const initialState = {
    message: "",
    error: false,
};

export default function EditOrderForm({ initialValues }: { initialValues: InitialValues }) {
    const [state, formAction, pending] = useActionState(updateOrderDetailsAction, initialState);
    const [order, setOrder] = useState<InitialValues>(initialValues); // Editable order state

    // Toast notifications based on server response
    useEffect(() => {
        if (state.message) {
            if (state.error) {
                toast.error(state.message, { dismissible: false, duration: Infinity });
            } else {
                toast.success(state.message);
            }
        }
    }, [state.message, state.error]);

    // Handle null initialValues gracefully
    if (!initialValues) {
        return <p>Order data not available. Please check the order ID.</p>;
    }

    return (
        <>
            <Toaster richColors /> {/* Toast notifications */}
            <form
                action={formAction}
                className="space-y-6"
            >
                {/* Hidden ID Field */}
                <input type="hidden" name="id" value={order.id} />

                {/* User ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="userId">
                        User ID
                    </label>
                    <input
                        id="userId"
                        type="number"
                        value={order.userId}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="amount">
                        Total Amount ($)
                    </label>
                    <input
                        id="amount"
                        type="number"
                        value={order.amount}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="status">
                        Order Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={order.status}
                        onChange={(e) => setOrder({ ...order, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

                {/* Items */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Ordered Items</label>
                    <ul className="space-y-2">
                        {order.items.map((item, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                            >
                                <span className="font-medium text-gray-800">{item.product.name}</span>
                                <span className="text-gray-600">Qty: {item.quantity}</span>
                                <span className="text-green-600">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium
                               transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <Edit3 className="w-5 h-5" />
                    {pending ? "Updating..." : "Update Order"}
                </button>
            </form>
        </>
    );
}

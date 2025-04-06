"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";

type OrderItems = {
    productId: 1, name: "Product A", quantity: 2, price: 50
}

export default function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>()

    // State for order data
    const [order, setOrder] = useState({
        userId: 0,
        amount: 0,
        status: "Pending",
        createdAt: "",
        items: [] as OrderItems[],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch order details on mount
    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true);
                const resolvedParams = await params;
                const orderId = resolvedParams.id;
                setOrderId(orderId);
                // Simulate fetching order data by id
                const response = await new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                id: orderId,
                                userId: 101,
                                amount: 150.75,
                                status: "Pending",
                                createdAt: "2023-04-01T10:30:00Z",
                                items: [
                                    { productId: 1, name: "Product A", quantity: 2, price: 50 },
                                    { productId: 2, name: "Product B", quantity: 1, price: 50.75 },
                                ],
                            }),
                        1000
                    )
                );
                setOrder(response as typeof order);
            } catch (err) {
                setError("Failed to load order data.");
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [orderId, params]);

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated order:", order);

        // Simulate saving order updates
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Order updated successfully!");
        router.push("/admin/orders");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-600">Loading order details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>{error}</p>
                <Link href="/admin/orders" className="text-blue-500 hover:underline">
                    Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Orders
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Order</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* User ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="userId">
                        User ID
                    </label>
                    <input
                        id="userId"
                        type="number"
                        value={order.userId}
                        onChange={(e) => setOrder({ ...order, userId: parseInt(e.target.value, 10) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
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
                        onChange={(e) => setOrder({ ...order, amount: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="status">
                        Order Status
                    </label>
                    <select
                        id="status"
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
                                <span className="font-medium text-gray-800">{item.name}</span>
                                <span className="text-gray-600">Qty: {item.quantity}</span>
                                <span className="text-green-600">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium
                               transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <Edit3 className="w-5 h-5" />
                    Update Order
                </button>
            </form>
        </div>
    );
}

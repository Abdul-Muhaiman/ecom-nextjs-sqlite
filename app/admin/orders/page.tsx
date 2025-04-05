"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2, List } from "lucide-react";

export default function OrdersPage() {
    // Hardcoded order data
    const orders = [
        {
            id: 1,
            userId: 101,
            amount: 150.75,
            status: "Pending",
            createdAt: "2023-04-01T10:30:00Z",
        },
        {
            id: 2,
            userId: 102,
            amount: 320.40,
            status: "Shipped",
            createdAt: "2023-03-30T14:15:00Z",
        },
        {
            id: 3,
            userId: 103,
            amount: 89.99,
            status: "Delivered",
            createdAt: "2023-03-28T09:45:00Z",
        },
    ];

    return (
        <div className="container mx-auto px-8 py-12">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">Order ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">User ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Amount ($)</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Status</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Created At</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            {/* Order ID */}
                            <td className="px-6 py-4">{order.id}</td>

                            {/* User ID */}
                            <td className="px-6 py-4">{order.userId}</td>

                            {/* Amount */}
                            <td className="px-6 py-4 font-semibold text-green-600">
                                ${order.amount.toFixed(2)}
                            </td>

                            {/* Status */}
                            <td
                                className={`px-6 py-4 font-medium ${
                                    order.status === "Delivered"
                                        ? "text-green-600"
                                        : order.status === "Shipped"
                                            ? "text-blue-600"
                                            : "text-yellow-600"
                                }`}
                            >
                                {order.status}
                            </td>

                            {/* Created At */}
                            <td className="px-6 py-4">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 flex space-x-4 items-center">
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                                <button
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

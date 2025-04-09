"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

// Hardcoded order data simulating your schema
const ordersData = [
    {
        id: 1,
        user: { id: 101, name: "John Doe", email: "john@example.com" },
        amount: 150.75,
        status: "Pending",
        createdAt: "2023-04-01T10:30:00Z",
        items: [
            { id: 1, productId: 11, quantity: 2, price: 75.37, product: { name: "Laptop" } },
        ],
    },
    {
        id: 2,
        user: { id: 102, name: "Jane Smith", email: "jane@example.com" },
        amount: 320.40,
        status: "Shipped",
        createdAt: "2023-03-30T14:15:00Z",
        items: [
            { id: 2, productId: 12, quantity: 1, price: 320.40, product: { name: "Smartphone" } },
        ],
    },
    {
        id: 3,
        user: { id: 103, name: "Bob Brown", email: "bob@example.com" },
        amount: 89.99,
        status: "Delivered",
        createdAt: "2023-03-28T09:45:00Z",
        items: [
            { id: 3, productId: 13, quantity: 3, price: 29.99, product: { name: "Headphones" } },
        ],
    },
    {
        id: 4,
        user: { id: 104, name: "Alice Green", email: "alice@example.com" },
        amount: 250.00,
        status: "Pending",
        createdAt: "2023-04-05T08:00:00Z",
        items: [
            { id: 4, productId: 14, quantity: 1, price: 250.00, product: { name: "Tablet" } },
        ],
    },
];

const limitPerPage = 2;

export default function OrdersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");

    // Filter orders based on status
    const filteredOrders = statusFilter
        ? ordersData.filter((order) => order.status.toLowerCase() === statusFilter.toLowerCase())
        : ordersData;

    // Paginate orders
    const totalPages = Math.ceil(filteredOrders.length / limitPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * limitPerPage,
        currentPage * limitPerPage
    );

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Reset page on filter change
    };

    // Handle order cancellation
    const handleCancelOrder = (orderId: number) => {
        // Update the status of the selected order to "Cancelled"
        const index = ordersData.findIndex((order) => order.id === orderId);
        if (index !== -1) {
            ordersData[index].status = "Cancelled";
            alert(`Order #${orderId} has been cancelled!`);
        }
    };

    return (
        <div className="container mx-auto px-8 py-12">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">Order ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">User</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Amount ($)</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Status</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Created At</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4">{order.id}</td>
                            <td className="px-6 py-4">
                                {order.user.name} ({order.user.email})
                            </td>
                            <td className="px-6 py-4 font-semibold text-green-600">
                                ${order.amount.toFixed(2)}
                            </td>
                            <td
                                className={`px-6 py-4 font-medium ${
                                    order.status === "Delivered"
                                        ? "text-green-600"
                                        : order.status === "Shipped"
                                            ? "text-blue-600"
                                            : order.status === "Pending"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                }`}
                            >
                                {order.status}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                            <td className="px-6 py-4 flex space-x-4 items-center">
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleCancelOrder(order.id)}
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage > 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage < totalPages ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

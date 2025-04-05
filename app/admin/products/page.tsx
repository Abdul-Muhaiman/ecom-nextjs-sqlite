"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash, Box } from "lucide-react";

export default function ProductsPage() {
    // Hardcoded product data
    const products = [
        {
            id: 1,
            name: "Product A",
            description: "High-quality product A.",
            price: 50,
            stock: 10,
            category: "Category 1",
            image: "/placeholder.png", // Replace with actual image URLs
        },
        {
            id: 2,
            name: "Product B",
            description: "Durable and stylish product B.",
            price: 30,
            stock: 5,
            category: "Category 2",
            image: "/placeholder.png", // Replace with actual image URLs
        },
        {
            id: 3,
            name: "Product C",
            description: "Affordable and reliable product C.",
            price: 20,
            stock: 0,
            category: "Category 3",
            image: "/placeholder.png", // Replace with actual image URLs
        },
    ];

    return (
        <div className="container mx-auto px-8 py-12">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition"
                >
                    Add Product
                </Link>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Image</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Category</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Price</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Stock</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            {/* ID */}
                            <td className="px-6 py-4">{product.id}</td>

                            {/* Product Image */}
                            <td className="px-6 py-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md border border-gray-200 shadow-sm"
                                />
                            </td>

                            {/* Product Name */}
                            <td className="px-6 py-4">{product.name}</td>

                            {/* Category */}
                            <td className="px-6 py-4 text-blue-600 font-medium">
                                {product.category}
                            </td>

                            {/* Price */}
                            <td className="px-6 py-4">${product.price.toFixed(2)}</td>

                            {/* Stock */}
                            <td
                                className={`px-6 py-4 font-semibold ${
                                    product.stock > 10
                                        ? "text-green-600"
                                        : product.stock > 0
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                }`}
                            >
                                {product.stock > 0 ? product.stock : "Out of Stock"}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 flex space-x-4 items-center">
                                <Link
                                    href={`/admin/products/${product.id}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                                <button
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                                >
                                    <Trash className="w-5 h-5" />
                                    Delete
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

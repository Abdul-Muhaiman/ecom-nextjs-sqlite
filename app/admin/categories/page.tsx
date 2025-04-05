"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2, Grid } from "lucide-react";

export default function CategoriesPage() {
    // Hardcoded categories data
    const categories = [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
        { id: 3, name: "Category 3" },
    ];

    return (
        <div className="container mx-auto px-8 py-12">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
                <Link
                    href="/admin/categories/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition"
                >
                    Add Category
                </Link>
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">Category ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                        <tr
                            key={category.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            {/* Category ID */}
                            <td className="px-6 py-4">{category.id}</td>

                            {/* Category Name */}
                            <td className="px-6 py-4 font-medium text-blue-600">
                                {category.name}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 flex space-x-4 items-center">
                                <Link
                                    href={`/admin/categories/${category.id}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                                <button
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
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

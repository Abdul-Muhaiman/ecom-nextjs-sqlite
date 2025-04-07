import React from "react";
import Link from "next/link";
import CategoryTable from "@/components/admin/category/CategoryTable";

export default function CategoriesPage() {

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

            <CategoryTable />
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddCategoryPage() {
    const router = useRouter();

    // State for category name
    const [categoryName, setCategoryName] = useState("");

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("New category:", categoryName);

        // Simulate saving category to database
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Category added successfully!");
        router.push("/admin/categories");
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Categories
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add New Category</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="categoryName">
                        Category Name
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium
                               transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <PlusCircle className="w-5 h-5" />
                    Add Category
                </button>
            </form>
        </div>
    );
}

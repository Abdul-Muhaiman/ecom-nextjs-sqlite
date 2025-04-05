"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [categoryId, setCategoryId] = useState<string | null>();

    // State for category data
    const [category, setCategory] = useState({
        id: categoryId,
        name: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch category details on mount
    useEffect(() => {
        async function fetchCategory() {
            try {
                setLoading(true);
                const resolvePromise = await params;
                const categoryId = resolvePromise.id
                setCategoryId(categoryId)

                // Simulate fetching category data by id
                const response = await new Promise((resolve) =>
                    setTimeout(() => resolve({ id: categoryId, name: "Category 1" }), 1000)
                );
                setCategory(response as typeof category);
            } catch (err) {
                setError("Failed to load category data.");
            } finally {
                setLoading(false);
            }
        }

        fetchCategory();
    }, [categoryId]);

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated category:", category);

        // Simulate saving category updates
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Category updated successfully!");
        router.push("/admin/categories");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-600">Loading category details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>{error}</p>
                <Link href="/admin/categories" className="text-blue-500 hover:underline">
                    Back to Categories
                </Link>
            </div>
        );
    }

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
                <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
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
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
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
                    <Edit3 className="w-5 h-5" />
                    Update Category
                </button>
            </form>
        </div>
    );
}

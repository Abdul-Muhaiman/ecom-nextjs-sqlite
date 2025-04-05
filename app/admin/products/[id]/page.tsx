"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [productId, setProductId] = useState<string | null>()

    // State for product data
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        category: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch product details on mount
    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const resolvedParams = await params;
                const productId = resolvedParams.id;
                setProductId(productId);
                // Simulate fetching product data by id
                const response = await new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                id: productId,
                                name: "Product A",
                                description: "High-quality product A.",
                                price: 50,
                                stock: 10,
                                image: "/placeholder.png", // Replace with actual image URLs
                                category: "Category 1",
                            }),
                        1000
                    )
                );
                setProduct(response as typeof product);
            } catch (err) {
                setError("Failed to load product data.");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated product:", product);

        // Simulate saving product updates
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Product updated successfully!");
        router.push("/admin/products");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-600">Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>{error}</p>
                <Link href="/admin/products" className="text-blue-500 hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-600 mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="price">
                        Price ($)
                    </label>
                    <input
                        id="price"
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="stock">
                        Stock Quantity
                    </label>
                    <input
                        id="stock"
                        type="number"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value, 10) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        id="image"
                        type="text"
                        value={product.image}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
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
                    Update Product
                </button>
            </form>
        </div>
    );
}

"use client";

import React, { useEffect } from "react";
import { Toaster, toast } from "sonner"; // Importing Sonner for toast notifications
import { useActionState } from "react"; // Assuming useActionState hook for server action handling
import { editProductAction } from "@/lib/actions/admin/product";
import {Edit3} from "lucide-react";

type InitialData = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    image: string | null;
    categoryId: number | null;
    category: {
        id: number;
        name: string;
    } | null;
};

const initialState = {
    message: "",
    error: false,
};

export default function EditProductForm({
                                            initialData,
                                        }: {
    initialData: InitialData | null;
}) {
    const [state, formAction, pending] = useActionState(editProductAction, initialState);

    // Show toast messages dynamically based on server response
    useEffect(() => {
        if (state.message) {
            if (state.error) {
                toast.error(state.message, { dismissible: false, duration: Infinity }); // Error toast
            } else {
                toast.success(state.message); // Success toast
            }
        }
    }, [state.message, state.error]);

    if (!initialData) {
        return <p>Product data not available. Please check the product ID.</p>; // Handle null case gracefully
    }

    return (
        <>
            <Toaster richColors /> {/* Enable vibrant notifications */}
            <form action={formAction} className="space-y-6">
                {/* Hidden ID Field */}
                <input type="hidden" name="id" value={initialData.id} />

                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={initialData.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={initialData.description || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Price ($)
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={initialData.price}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Stock */}
                <div>
                    <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Stock Quantity
                    </label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        defaultValue={initialData.stock}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        defaultValue={initialData.category?.id}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="1">Men</option>
                        <option value="2">Women</option>
                        <option value="3">Electronics</option>
                        <option value="4">Jewelry</option>
                    </select>
                </div>

                {/* Image */}
                <div>
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Image URL
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="text"
                        defaultValue={initialData.image || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <Edit3 className="w-5 h-5" />
                    {pending ? "Updating..." : "Update Product"}
                </button>
            </form>
        </>
    );
}

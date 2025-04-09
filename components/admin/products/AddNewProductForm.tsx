"use client";

import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useActionState } from "react";
import { addNewProductAction } from "@/lib/actions/admin/product";

const initialState = {
    message: "",
    error: false,
};

export default function AddNewProductForm() {
    // Local state for form fields
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
    });

    // Handle input changes
// Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    // useActionState integration
    const [state, formAction, pending] = useActionState(addNewProductAction, initialState);

    return (
        <form action={formAction} className="space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
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
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
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
                    name="price"
                    value={product.price}
                    onChange={handleChange}
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
                    name="stock"
                    placeholder={"Enter stock amount"}
                    value={product.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="category">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
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
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="image">
                    Image URL
                </label>
                <input
                    id="image"
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            {/* Error or Success Message */}
            {state.message && (
                <p className={`text-sm ${state.error ? "text-red-600" : "text-green-600"}`}>
                    {state.message}
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium
                           transition-transform duration-300 transform hover:scale-105 shadow-md"
            >
                <PlusCircle className="w-5 h-5" />
                {pending ? "Adding..." : "Add Product"}
            </button>
        </form>
    );
}

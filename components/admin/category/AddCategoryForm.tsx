"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner"; // For toast notifications
import { PlusCircle } from "lucide-react";
import { useActionState } from "react"; // Assuming this hook is for server action integration
import { addNewCategoryAction } from "@/lib/actions/admin/category"; // Server action for adding a category

type CategoryState = {
    message: string;
    error: boolean;
};

const initialState: CategoryState = {
    message: "",
    error: false,
};

export default function AddCategoryForm() {
    const [state, formAction, pending] = useActionState(addNewCategoryAction, initialState);
    const [categoryName, setCategoryName] = useState("");

    // Handle toast notifications
    useEffect(() => {
        if (state.message) {
            if (state.error) {
                toast.error(state.message, { dismissible: false, duration: Infinity });
            } else {
                toast.success(state.message);
                setCategoryName(""); // Reset the form on success
            }
        }
    }, [state.message, state.error]);

    return (
        <>
            <Toaster richColors /> {/* Toast notifications */}
            <form action={formAction} className="space-y-6">
                {/* Category Name */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-600 mb-2"
                        htmlFor="categoryName"
                    >
                        Category Name
                    </label>
                    <input
                        id="categoryName"
                        name="name"
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
                    disabled={pending}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <PlusCircle className="w-5 h-5" />
                    {pending ? "Adding..." : "Add Category"}
                </button>
            </form>
        </>
    );
}

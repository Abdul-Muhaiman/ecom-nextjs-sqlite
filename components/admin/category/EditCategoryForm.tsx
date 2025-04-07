"use client";

import React, { useEffect } from "react";
import { Toaster, toast } from "sonner"; // For toast notifications
import { useActionState } from "react"; // Hook for server action handling
import { editCategoryAction } from "@/lib/actions/admin/category";
import {Edit3} from "lucide-react"; // Import the action

type InitialData = {
    id: number;
    name: string;
};

const initialState = {
    message: "",
    error: false,
};

export default function EditCategoryForm({ initialData }: { initialData: InitialData | null }) {
    const [state, formAction, pending] = useActionState(editCategoryAction, initialState);

    // Show toast messages dynamically based on server response
    useEffect(() => {
        if (state.message) {
            if (state.error) {
                toast.error(state.message, { dismissible: false, duration: Infinity });
            } else {
                toast.success(state.message);
            }
        }
    }, [state.message, state.error]);

    // Handle null initialData gracefully
    if (!initialData) {
        return <p>Category data not available. Please check the category ID.</p>;
    }

    return (
        <>
            <Toaster richColors /> {/* Toast notifications */}
            <form action={formAction} className="space-y-6">
                {/* Hidden ID Field */}
                <input type="hidden" name="id" value={initialData.id} />

                {/* Category Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                        Category Name
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

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <Edit3 className="w-5 h-5" />
                    {pending ? "Updating..." : "Update Category"}
                </button>
            </form>
        </>
    );
}

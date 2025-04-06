"use client";

import React, { useEffect } from "react";
import { Toaster, toast } from "sonner"; // Importing Sonner for toast notifications
import { useActionState } from "react"; // Assuming useActionState hook for server action handling
import { editUserAction } from "@/lib/actions/admin/users";

type InitialData = {
    id: string | number;
    name: string;
    email: string;
    role: string;
};

const initialState = {
    message: "",
    error: false,
};

export default function EditUserForm({ initialData }: { initialData: InitialData | null }) {
    const [state, formAction, pending] = useActionState(editUserAction, initialState);

    // Show toast messages dynamically based on server response
    useEffect(() => {
        if (state.message) {
            if (state.error) {
                toast.error(state.message, { dismissible: false, duration: Infinity }); // Error toast with richColors
            } else {
                toast.success(state.message); // Success toast with richColors
            }
        }
    }, [state.message, state.error]);

    if (!initialData) {
        return <p>User data not available. Please check the user ID.</p>; // Handle null case gracefully
    }

    return (
        <>
            <Toaster richColors /> {/* Enable richColors for vibrant notifications */}
            <form action={formAction} className="space-y-6">
                {/* Hidden ID Field */}
                <input type="hidden" name="id" value={initialData.id} />

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
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

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={initialData.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        defaultValue={initialData.role}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    {pending ? "Updating..." : "Update User"}
                </button>
            </form>
        </>
    );
}

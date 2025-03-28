"use client";

import { useState } from "react";

export default function Page() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (data: FormData) => {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                setSuccessMessage("User registered successfully!");
                setErrorMessage(null); // Clear any previous errors
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.error || "Something went wrong");
                setSuccessMessage(null);
            }
        } catch (e) {
            setErrorMessage("An unexpected error occurred.");
            setSuccessMessage(null);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Register User</h1>
                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {errorMessage}
                    </div>
                )}
                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="referralCodeUsed" className="block font-medium text-gray-700">
                            Referral Code (Optional)
                        </label>
                        <input
                            type="text"
                            id="referralCodeUsed"
                            name="referralCodeUsed"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

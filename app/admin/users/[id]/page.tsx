"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>()

    // State for User Data
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "user",
        referredBy: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch User Details on Mount
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const resolvedParams = await params;
                const userId = resolvedParams.id;
                setUserId(userId);

                // Fetch user data
                const response = await new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                id: userId,
                                name: "John Doe",
                                email: "john@example.com",
                                role: "user",
                                referredBy: "Jane Smith",
                            }),
                        1000
                    )
                );
                setUser(response as typeof user);
            } catch (err) {
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params]);

    // Form Submission Handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated user:", user);

        // Simulate saving user details
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("User updated successfully!");
        router.push("/admin/users");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-600">Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>{error}</p>
                <Link href="/admin/users" className="text-blue-500 hover:underline">
                    Back to Users
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Users
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
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
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="role">
                        Role
                    </label>
                    <select
                        id="role"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Referred By */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="referredBy">
                        Referred By
                    </label>
                    <input
                        id="referredBy"
                        type="text"
                        value={user.referredBy}
                        onChange={(e) => setUser({ ...user, referredBy: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium
                               transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                    <Edit3 className="w-5 h-5" />
                    Update User
                </button>
            </form>
        </div>
    );
}

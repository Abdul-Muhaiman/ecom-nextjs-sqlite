"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Edit, Loader2, Trash, XCircle} from "lucide-react";
import {User} from "@/types/user"
import {getUsersAction} from "@/lib/actions/admin/users";

export default function UsersPage() {

    const [users, setUsers] = useState<User[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const users: User[] = await getUsersAction();
                if (!users || users.length === 0) setError("No users found");
                setUsers(users);
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("Failed to load cart items. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
                <p className="ml-4 text-gray-600">Loading your cart...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12 text-red-500">
                <XCircle className="w-10 h-10 mr-2" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Email</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Role</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Referral Code</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Referred By</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((user) => (
                        <tr
                            key={user?.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            <td className="px-6 py-4">{user?.id}</td>
                            <td className="px-6 py-4">{user?.name}</td>
                            <td className="px-6 py-4">{user?.email}</td>
                            <td
                                className={`px-6 py-4 ${
                                    user?.role === "admin"
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-800"
                                }`}
                            >
                                {user?.role}
                            </td>
                            <td className="px-6 py-4">{user?.referralCode}</td>
                            <td className="px-6 py-4">{user?.referredBy?.name}</td>
                            <td className="px-6 py-4 flex space-x-4 items-center">
                                <Link
                                    href={`/admin/users/${user?.id}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                                <button
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                                >
                                    <Trash className="w-5 h-5" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

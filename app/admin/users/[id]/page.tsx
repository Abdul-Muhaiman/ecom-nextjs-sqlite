import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { getUserById_DAL } from "@/lib/dal/users";
import EditUserForm from "@/components/admin/users/EditUserForm";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await getUserById_DAL(parseInt(id));

    if (!user) {
        // Handle null case directly in the parent component
        return (
            <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
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
                <p>User data not found. Please check the user ID.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
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

            {/* Pass the non-null user object to the form */}
            <EditUserForm initialData={user} />
        </div>
    );
}

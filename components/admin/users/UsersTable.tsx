import {getAllUsers_DAL} from "@/lib/dal/users";
import Link from "next/link";
import {Edit} from "lucide-react";
import React from "react";
import DeleteUser from "@/components/admin/users/DeleteUser";

const UserTable = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay
    const allUsers = await getAllUsers_DAL();
    const users = allUsers.filter(value => !(value.deleted && value.deletedAt));

    return (
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
                    <tr key={user?.id} className="hover:bg-gray-50 transition duration-200">
                        <td className="px-6 py-4">{user.id}</td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td
                            className={`px-6 py-4 ${
                                user.role === "admin"
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-800"
                            }`}
                        >
                            {user.role}
                        </td>
                        <td className="px-6 py-4">{user.referralCode}</td>
                        <td
                            className={`px-6 py-4 ${
                                !user.referredBy?.name
                                    ? "text-red-600 font-semibold"
                                    : "text-gray-800"
                            }`}
                        >
                            {user.referredBy ? user.referredBy.name : "No referrer"}
                        </td>
                        <td className="px-6 py-4 flex space-x-4 items-center">
                            <Link
                                href={`/admin/users/${user.id}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                            >
                                <Edit className="w-5 h-5"/>
                                Edit
                            </Link>
                            <DeleteUser userId={user.id} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
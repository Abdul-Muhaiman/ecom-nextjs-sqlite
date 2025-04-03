import React from "react";
import Link from "next/link";
import {getInitials} from "@/utils/helper";
import {User} from "@/types/user";

const UserProfile = ({ user }: { user: User }) => {

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            {/* Header Section */}
            <div className="text-center">
                <div
                    className="h-20 w-20 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-md"
                >
                    {getInitials(user.name)}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mt-4">{user.name}</h1>
                <p className="text-gray-600 text-lg">{user.email}</p>
                <Link href="/dashboard/referral">
                    <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                        View Commissions
                    </button>
                </Link>
            </div>

            {/* Referral Code Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Your Referral Code</h2>
                <div className="p-5 bg-blue-50 text-blue-700 text-center font-mono text-2xl font-bold rounded-lg shadow-sm">
                    {user.referralCode}
                </div>
            </div>

            {/* Referred By Section */}
            {user.referredBy && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Referred By</h2>
                    <div className="flex items-center gap-4">
                        <div
                            className="h-14 w-14 bg-gray-300 text-gray-800 rounded-full flex items-center justify-center text-lg font-bold shadow-sm"
                        >
                            {getInitials(user.referredBy.name)}
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-900">{user.referredBy.name}</p>
                            <p className="text-gray-600 text-sm">{user.referredBy.email}</p>
                        </div>
                    </div>
                    <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold inline-block">
                        Referral Code: {user.referredBy.referralCode}
                    </div>
                </div>
            )}

            {/* Referred Users Section */}
            {user.referredUsers && user.referredUsers.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Users You&#39;ve Referred</h2>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                            <thead>
                            <tr className="bg-blue-500 text-white text-left">
                                <th className="px-5 py-3 text-sm font-bold uppercase">Name</th>
                                <th className="px-5 py-3 text-sm font-bold uppercase">Email</th>
                                <th className="px-5 py-3 text-sm font-bold uppercase">Referral Code</th>
                            </tr>
                            </thead>
                            <tbody>
                            {user.referredUsers.map((referredUser) => (
                                <tr
                                    key={referredUser.id}
                                    className="hover:bg-gray-100 transition-colors duration-300"
                                >
                                    <td className="px-5 py-4 text-sm text-gray-800 font-medium">
                                        {referredUser.name}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{referredUser.email}</td>
                                    <td className="px-5 py-4 text-sm text-gray-900 font-bold">
                                        {referredUser.referralCode}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;

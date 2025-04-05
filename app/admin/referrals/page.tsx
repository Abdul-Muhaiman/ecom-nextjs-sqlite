"use client";

import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";

export default function ReferralsPage() {
    // Hardcoded referral data based on schema
    const referrals = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            referralCode: "ABCD1234",
            referralsCount: 3, // Number of referred users
            referredBy: "Jane Smith", // Name of referrer
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            referralCode: "EFGH5678",
            referralsCount: 2,
            referredBy: "None",
        },
    ];

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Referral Management</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">User ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Email</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Referral Code</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Referrals Count</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Referred By</th>
                    </tr>
                    </thead>
                    <tbody>
                    {referrals.map((referral) => (
                        <tr key={referral.id} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4">{referral.id}</td>
                            <td className="px-6 py-4">{referral.name}</td>
                            <td className="px-6 py-4">{referral.email}</td>
                            <td className="px-6 py-4">{referral.referralCode}</td>
                            <td className="px-6 py-4 font-medium text-blue-600">
                                {referral.referralsCount}
                            </td>
                            <td className="px-6 py-4">{referral.referredBy}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

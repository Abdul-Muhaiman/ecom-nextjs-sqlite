"use client";

import React from "react";
import { DollarSign } from "lucide-react";

export default function CommissionsPage() {
    // Hardcoded commissions data based on schema
    const commissions = [
        {
            id: 1,
            orderId: 101,
            referrerName: "John Doe",
            commissionAmount: 15.5,
            level: 1,
            createdAt: "2023-04-01T10:30:00Z",
        },
        {
            id: 2,
            orderId: 102,
            referrerName: "Jane Smith",
            commissionAmount: 20.75,
            level: 2,
            createdAt: "2023-03-30T14:15:00Z",
        },
    ];

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Commission Management</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">Commission ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Order ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Referrer Name</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Commission Amount ($)</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Level</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {commissions.map((commission) => (
                        <tr key={commission.id} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4">{commission.id}</td>
                            <td className="px-6 py-4">{commission.orderId}</td>
                            <td className="px-6 py-4">{commission.referrerName}</td>
                            <td className="px-6 py-4 font-medium text-green-600">
                                ${commission.commissionAmount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">{commission.level}</td>
                            <td className="px-6 py-4">
                                {new Date(commission.createdAt).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

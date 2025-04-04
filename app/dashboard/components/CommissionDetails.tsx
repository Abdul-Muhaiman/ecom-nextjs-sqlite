import React from 'react';
import { Commission } from "@/types/commission";
import {formatDate} from "@/lib/utils/helper";

const CommissionDetails = ({ commissions }: { commissions: Commission[] }) => {

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
                Commissions
            </h1>

            {commissions.length === 0 ? (
                <div
                    className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
                    role="alert"
                >
                    <p className="text-xl font-semibold">No Commissions Found</p>
                    <p className="text-gray-700">There are no commissions to display.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-gray-50">
                    <table className="min-w-full leading-normal rounded-lg">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-blue-600 text-left text-sm font-semibold uppercase tracking-wide">
                                Sr
                            </th>
                            <th className="px-5 py-3 border-b-2 border-blue-600 text-left text-sm font-semibold uppercase tracking-wide">
                                Commission Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-blue-600 text-left text-sm font-semibold uppercase tracking-wide">
                                Level
                            </th>
                            <th className="px-5 py-3 border-b-2 border-blue-600 text-left text-sm font-semibold uppercase tracking-wide">
                                Order Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-blue-600 text-left text-sm font-semibold uppercase tracking-wide">
                                Customer Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-blue-600 text-left text-sm font-semibold uppercase tracking-wide">
                                Date
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {commissions.map((commission, index) => (
                            <tr
                                key={commission.id}
                                className="hover:bg-gray-100 transition-colors duration-300"
                            >
                                <td className="px-5 py-4 border-b border-gray-200 text-sm font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-800 font-semibold">
                                    ${commission.commissionAmount.toFixed(2)}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-600">
                                    Level {commission.level}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-800 font-semibold">
                                    ${commission.order.amount.toFixed(2)}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-800">
                                    {commission.order.user.name}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-600">
                                    {formatDate(commission.createdAt)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CommissionDetails;

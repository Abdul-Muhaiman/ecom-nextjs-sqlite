import React from 'react';
import {Commission} from "@/types/commission";

const CommissionDetails = ({ commissions }: { commissions: Commission[] }) => {
    // Function to format date for better readability
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Commissions</h1>

            {commissions.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
                    <p className="font-bold">No Commissions Found</p>
                    <p>There are no commissions to display.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                Sr
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                Commission Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                Level
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                Order Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                Customer Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                Date
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {commissions.map((commission) => (
                            <tr key={commission.id}>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{commission.id}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">${commission.commissionAmount.toFixed(2)}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{commission.level}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">${commission.order.amount.toFixed(2)}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{commission.order.user.name}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{formatDate(commission.createdAt)}</td>
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

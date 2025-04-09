"use client";

import { useRouter } from "next/navigation";

export default function OrdersFilter() {
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.target.value;
        router.push(selectedStatus ? `?status=${selectedStatus.toLowerCase()}` : "?");
    };

    return (
        <div className="flex justify-between items-center mt-6 mb-12 space-x-3">
            <select
                className="bg-white border border-gray-300 rounded-full px-5 py-3 text-sm font-medium shadow-md transition-all hover:bg-gray-100 focus:outline-none"
                onChange={handleFilterChange}
                defaultValue=""
            >
                <option value="" className="text-gray-700">All Status</option>
                <option value="Pending" className="text-gray-700">Pending</option>
                <option value="Shipped" className="text-gray-700">Shipped</option>
                <option value="Delivered" className="text-gray-700">Delivered</option>
                <option value="Cancelled" className="text-gray-700">Cancelled</option>
            </select>
        </div>
    );
}

import Link from "next/link";
import {ChevronLeft, ChevronRight, Edit, Trash2} from "lucide-react";
import { getAllOrders } from "@/lib/dal/order";
import OrdersFilter from "@/components/admin/order/OrdersFilter";

type SearchParams = {
    status?: string;
    page?: string;
};

export default async function OrdersTable({ searchParams }: { searchParams: SearchParams }) {
    // Extract status and page from searchParams
    const status = searchParams?.status || "";
    const currentPage = parseInt(searchParams?.page || "1", 10);

    // Fetch orders and pagination from the server using getAllOrders
    const { orders, pagination } = await getAllOrders({
        page: currentPage,
        limit: 3,
        status: status.toUpperCase(),
    });

    return (
        <div>
            {/* Status Filter */}
            <OrdersFilter />

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-600">Order ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">User</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Amount ($)</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Status</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Created At</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4">{order.id}</td>
                            <td className="px-6 py-4">
                                {order.user.name} ({order.user.email})
                            </td>
                            <td className="px-6 py-4 font-semibold text-green-600">
                                ${order.amount.toFixed(2)}
                            </td>
                            <td
                                className={`px-6 py-4 font-medium ${
                                    order.status.toLowerCase() === "delivered"
                                        ? "text-green-600"
                                        : order.status.toLowerCase() === "shipped"
                                            ? "text-blue-600"
                                            : order.status.toLowerCase() === "pending"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                }`}
                            >
                                {order.status.toUpperCase()}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                            <td className="px-6 py-4 flex space-x-4 items-center">
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                                <span
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition cursor-pointer"
                                >
                                        <Trash2 className="w-5 h-5" />
                                        Cancel
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div>
                {pagination?.pages > 1 && ( // Check if pagination exists
                    <div className="flex justify-center items-center mt-12 space-x-3">
                        {/* Previous Button */}
                        <Link
                            href={`?${new URLSearchParams({
                                status: status,
                                page: (currentPage - 1).toString(),
                            })}`}
                        >
                            <button
                                disabled={currentPage <= 1}
                                className={`px-4 py-2 rounded-full transition-all font-medium flex items-center gap-2
                                ${currentPage <= 1
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                        </Link>

                        {/* Page Numbers */}
                        <div className="flex items-center space-x-2">
                            {[...Array(pagination.pages)].map((_, i) => {
                                const pageNum = i + 1;

                                if (
                                    pageNum === 1 ||
                                    pageNum === pagination.pages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <Link
                                            key={i}
                                            href={`?${new URLSearchParams({
                                                status: status,
                                                page: pageNum.toString(),
                                            })}`}
                                        >
                                            <button
                                                disabled={currentPage === pageNum}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                                                ${currentPage === pageNum
                                                    ? "bg-blue-600 text-white shadow-md"
                                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
                                            >
                                                {pageNum}
                                            </button>
                                        </Link>
                                    );
                                } else if (
                                    (pageNum === 2 && currentPage > 3) ||
                                    (pageNum === pagination.pages - 1 && currentPage < pagination.pages - 2)
                                ) {
                                    // Ellipsis for skipped page numbers
                                    return (
                                        <span key={i} className="text-gray-500 px-2">
                                ...
                            </span>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Next Button */}
                        <Link
                            href={`?${new URLSearchParams({
                                status: status,
                                page: (currentPage + 1).toString(),
                            })}`}
                        >
                            <button
                                disabled={currentPage >= pagination.pages}
                                className={`px-4 py-2 rounded-full transition-all font-medium flex items-center gap-2
                                ${currentPage >= pagination.pages
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"}`}
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                )}
            </div>


        </div>
    );
}

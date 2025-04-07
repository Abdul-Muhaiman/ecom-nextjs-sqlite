import React from "react";

const ProductsTableSkeleton = () => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-4 font-medium text-gray-600">ID</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Image</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Category</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Price</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Stock</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {[...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                        {/* ID Placeholder */}
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded-md w-10"></div>
                        </td>

                        {/* Image Placeholder */}
                        <td className="px-6 py-4">
                            <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                        </td>

                        {/* Name Placeholder */}
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                        </td>

                        {/* Category Placeholder */}
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                        </td>

                        {/* Price Placeholder */}
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                        </td>

                        {/* Stock Placeholder */}
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                        </td>

                        {/* Actions Placeholder */}
                        <td className="px-6 py-4 flex space-x-4">
                            <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTableSkeleton;

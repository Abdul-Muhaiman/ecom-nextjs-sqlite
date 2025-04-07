import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import Link from "next/link";
import {Edit} from "lucide-react";
import React from "react";
import {getAllProducts_DAL} from "@/lib/dal/product";
import DeleteProductBtn from "@/components/admin/products/DeleteProductBtn";

export default async function ProductsTable() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay
    const allProducts = await getAllProducts_DAL();
    const products = allProducts.filter((val) => !val.deleted);

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
                {products.map((product) => (
                    <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition duration-200"
                    >
                        {/* ID */}
                        <td className="px-6 py-4">{product.id}</td>

                        {/* Product Image */}
                        <td className="px-6 py-4">
                            <div className="relative w-8 h-8 flex-shrink-0">
                                <Image
                                    src={product.image || Placeholder}
                                    alt={`Product image of ${product.name}`}
                                    fill
                                    className="object-contain rounded-lg border border-gray-200"
                                />
                            </div>
                        </td>

                        {/* Product Name */}
                        <td className="px-6 py-4">{product.name}</td>

                        {/* Category */}
                        <td className="px-6 py-4 text-blue-600 font-medium">
                            {product.category ? product.category.name.toUpperCase() : "No category"}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4">${product.price.toFixed(2)}</td>

                        {/* Stock */}
                        <td
                            className={`px-6 py-4 font-semibold ${
                                product.stock > 10
                                    ? "text-green-600"
                                    : product.stock > 0
                                        ? "text-yellow-500"
                                        : "text-red-500"
                            }`}
                        >
                            {product.stock > 0 ? product.stock : "Out of Stock"}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 flex space-x-4 items-center">
                            <Link
                                href={`/admin/products/${product.id}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                            >
                                <Edit className="w-5 h-5"/>
                                Edit
                            </Link>
                            <DeleteProductBtn id={product.id} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
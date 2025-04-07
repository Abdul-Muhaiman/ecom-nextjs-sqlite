import Link from "next/link";
import {Edit} from "lucide-react";
import React from "react";
import {getAllCategories_DAL} from "@/lib/dal/category";
import DeleteCategoryBtn from "@/components/admin/category/DeleteCategoryBtn";

export default async function CategoryTable() {
    const allCategories = await getAllCategories_DAL();
    const categories = allCategories.filter(category => !category.deleted);

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-4 font-medium text-gray-600">Category ID</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                    <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr
                        key={category.id}
                        className="hover:bg-gray-50 transition duration-200"
                    >
                        {/* Category ID */}
                        <td className="px-6 py-4">{category.id}</td>

                        {/* Category Name */}
                        <td className="px-6 py-4 font-medium text-blue-600 uppercase">
                            {category.name}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 flex space-x-4 items-center">
                            <Link
                                href={`/admin/categories/${category.id}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                            >
                                <Edit className="w-5 h-5"/>
                                Edit
                            </Link>
                            <DeleteCategoryBtn id={category.id} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

import { ArrowLeft } from "lucide-react";import Link from "next/link";
import AddCategoryForm from "@/components/admin/category/AddCategoryForm";

export default function AddCategoryPage() {
    return (
        <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5"/>
                    Back to Categories
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add New Category</h1>
            </div>

            {/* Form */}
            <AddCategoryForm />
        </div>
    );
}

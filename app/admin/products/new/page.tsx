import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddNewProductForm from "@/components/admin/products/AddNewProductForm";

export default function AddProductPage() {
    return (
        <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5"/>
                    Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
            </div>

            {/* Form */}
            <AddNewProductForm />
        </div>
    );
}

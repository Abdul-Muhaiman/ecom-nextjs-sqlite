import { ArrowLeft } from "lucide-react";
import React from "react";
import Link from "next/link";
import { getProductById_DAL } from "@/lib/dal/product";
import EditProductForm from "@/components/admin/products/EditProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
                                                  params,
                                              }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProductById_DAL(parseInt(id));

    if (!product) {
        // Handle null case directly in the parent component
        return (
            <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Products
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
                </div>
                <p>Product data not found. Please check the product ID.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>

            {/* Pass the non-null product object to the form */}
            <EditProductForm initialData={product} />
        </div>
    );
}

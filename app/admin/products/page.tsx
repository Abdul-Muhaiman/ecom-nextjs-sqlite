import React, {Suspense} from "react";
import Link from "next/link";
import ProductsTable from "@/components/admin/products/ProductsTable";
import ProductsTableSkeleton from "@/components/admin/products/ProductsTableSkeleton";

export default async function ProductsPage() {

    return (
        <div className="container mx-auto px-8 py-12">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition"
                >
                    Add Product
                </Link>
            </div>

            {/* Product Table */}
            <Suspense fallback={<ProductsTableSkeleton />}>
                <ProductsTable />
            </Suspense>
        </div>
    );
}

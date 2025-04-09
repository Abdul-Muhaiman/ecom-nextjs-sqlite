import { Suspense } from "react";
import OrdersTable from "@/components/admin/order/OrdersTable";

type SearchParams = { [key: string]: string | string[] | undefined}

export default async function OrdersPage({searchParams} : { searchParams: Promise<SearchParams>} ) {
    const queryParams = await searchParams;
    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management</h1>

            {/* Suspense Boundary with Fallback */}
            <Suspense fallback={<p className="text-center text-gray-500">Loading orders...</p>}>
                <OrdersTable searchParams={queryParams} />
            </Suspense>
        </div>
    );
}

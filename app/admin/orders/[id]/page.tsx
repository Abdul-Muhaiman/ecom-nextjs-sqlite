import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "@/lib/dal/order";
import EditOrderForm from "@/components/admin/order/EditOrderForm";

export const dynamic = "force-dynamic"; // To ensure fresh data is fetched dynamically

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const orderById = await getOrderById(parseInt(id));

    if (!orderById) {
        // Handle null order directly in the parent component
        return (
            <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Orders
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Order</h1>
                </div>
                <p>Order data not found. Please check the order ID.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Orders
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Order</h1>
            </div>

            {/* Pass the non-null order object to the form */}
            <EditOrderForm initialValues={orderById} />
        </div>
    );
}

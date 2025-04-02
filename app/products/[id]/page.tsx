import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductDetails from "./components/ProductDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { category: true },
    });

    if (!product) {
        return (
            <div className="container mx-auto text-center">
                <h1 className="text-3xl font-bold text-gray-800">Product Not Found</h1>
                <p className="text-gray-600">We couldn&#39;t find the product you&#39;re looking for.</p>
                <Link href="/products" className="text-blue-500 hover:underline">
                    ← Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">
            {/* Back Button */}
            <div className="mb-8 w-full">
                <Link href="/products" className="text-blue-500 hover:underline text-sm font-medium">
                    ← Back to Products
                </Link>
            </div>

            {/* Pass product data to Client Component */}
            <ProductDetails product={product} />
        </div>
    );
}

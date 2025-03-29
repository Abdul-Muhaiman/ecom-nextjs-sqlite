import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Page(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            category: true,
        },
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
                <Link
                    href="/products"
                    className="text-blue-500 hover:underline text-sm font-medium"
                >
                    ← Back to Products
                </Link>
            </div>

            <section className="text-gray-600 w-full">
                <div className="flex flex-col lg:flex-row w-full bg-white overflow-hidden">
                    {/* Enlarged Product Image */}
                    <div className="relative w-full lg:w-3/5 h-[500px] flex items-center justify-center">
                        <Image
                            src={product.image || Placeholder}
                            alt={product.name}
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                            className="transition-transform duration-300 object-contain"
                            priority
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-2/5 p-6 flex flex-col">
                        {/* Category */}
                        <h2 className="text-xs uppercase tracking-widest font-medium text-blue-600">
                            {product.category?.name.toUpperCase()}
                        </h2>

                        {/* Product Name */}
                        <h1 className="text-gray-900 text-3xl font-bold mt-2 mb-4">
                            {product.name}
                        </h1>

                        {/* Description */}
                        <p className="leading-relaxed text-sm text-gray-700 mb-6">
                            {product.description}
                        </p>

                        {/* Spacer to push price/stock and CTA to the bottom */}
                        <div className="mt-auto">
                            {/* Price and Stock */}
                            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <span className="text-lg font-semibold text-green-600">
              ${product.price}
            </span>
                                <span className="text-sm text-gray-500">
              Stock: <span className="font-bold">{product.stock}</span>
            </span>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="mt-6">
                                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium transition-transform transform hover:scale-105 shadow">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

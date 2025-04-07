import Link from "next/link";
import { getProductById_DAL } from "@/lib/dal/product";
import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";
import { ArrowLeft, Package, ShoppingCart, AlertTriangle } from "lucide-react";
import {AddToCartButton} from "@/components/AddToCartButton";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await getProductById_DAL(parseInt(id, 10));

    if (!product) {
        return (
            <div className="container mx-auto text-center py-20 space-y-6">
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
                <h1 className="text-4xl font-bold text-gray-800">Product Not Found</h1>
                <p className="text-gray-600 text-lg">
                    We couldn&#39;t find the product you&#39;re looking for. It might be out of stock or removed.
                </p>
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium
                               bg-blue-100 py-2 px-4 rounded-md shadow-md transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
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
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium
                               bg-blue-100 py-2 px-4 rounded-md shadow-md transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </Link>
            </div>

            {/* Product Details */}
            <ProductDetails product={product} />
        </div>
    );
}

const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
            <div className="container mx-auto px-8">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden
                            border border-gray-200 transition-all duration-300
                            hover:shadow-2xl hover:border-blue-500/30 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Product Image */}
                        <div className="relative w-full lg:w-1/2 aspect-w-1 aspect-h-1 flex items-center justify-center p-12 m-10">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: "contain" }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="rounded-t-lg lg:rounded-l-lg transition-transform duration-300 transform hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-full lg:w-1/2 p-12 space-y-8 flex flex-col justify-between">
                            <div className="space-y-6">
                                {/* Category */}
                                <h2 className="text-sm text-blue-500 uppercase tracking-wide font-medium">
                                    <Package className="inline-block w-5 h-5 mr-2" />
                                    {product.category?.name || "Uncategorized"}
                                </h2>

                                {/* Product Name */}
                                <h1 className="text-4xl font-bold text-gray-800 leading-tight tracking-tight">
                                    {product.name}
                                </h1>

                                {/* Description */}
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Price, Stock, & Add to Cart */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-12 border-t border-gray-200 pt-8">
                                <div className="space-y-4">
                                    {/* Price */}
                                    <p className="text-2xl font-semibold text-green-600 transition-colors duration-300">
                                        ${product.price?.toLocaleString()}
                                    </p>
                                    {/* Stock */}
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        Stock:
                                        <span
                                            className={`font-bold ${
                                                product.stock > 10
                                                    ? "text-green-600"
                                                    : product.stock > 0
                                                        ? "text-yellow-500"
                                                        : "text-red-500"
                                            }`}
                                        >
                                            {product.stock > 0 ? product.stock : "Out of Stock"}
                                        </span>
                                    </p>
                                </div>
                                {/* Add to Cart Button */}
                                <AddToCartButton
                                    product={product}
                                    style="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-medium
                                               transition-all duration-300 transform hover:scale-105 shadow-md"
                                    icon={<ShoppingCart className="w-6 h-6" />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

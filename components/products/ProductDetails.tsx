"use client"

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import {Product} from "@/types/product";
import {AddToCartButton} from "@/components/AddToCartButton";

// Mock AddToCartButton
const AddToCart = ({ product, style }: { product: Product, style: string }) => {
    const icon : React.ReactNode = <ShoppingCart className="w-5 h-5 mr-2 inline-block" />;
    return (
        <AddToCartButton product={product} style={style} icon={icon} />
    );
};

const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-8">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden
                            border border-gray-100 transition-all duration-300
                            hover:shadow-xl hover:border-blue-500/30 max-w-7xl mx-auto"> {/* Added max-w-7xl and mx-auto */}
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Enlarged Product Image */}
                        <div className="relative w-full lg:w-1/2 aspect-w-1 aspect-h-1 flex items-center justify-center p-16 m-6"> {/* Increased p-16 */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="rounded-t-lg lg:rounded-l-lg"
                                priority
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-full lg:w-1/2 p-12 space-y-12 flex flex-col justify-between"> {/* Increased p-12 and space-y-12 */}
                            <div className="space-y-8">
                                {/* Category */}
                                <h2 className="text-sm text-blue-500 uppercase tracking-wide font-medium transition-colors duration-200">
                                    {product.category?.name || "Uncategorized"}
                                </h2>

                                {/* Product Name */}
                                <h1 className="text-3xl font-bold text-gray-800 leading-tight tracking-tight">
                                    {product.name}
                                </h1>

                                {/* Description */}
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Price and Stock & Add to Cart */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-12 border-t border-gray-200 pt-12"> {/* Increased gap-12 and pt-12 */}
                                <div className="space-y-4">
                                    {/* Price */}
                                    <p className="text-2xl font-semibold text-green-600 transition-colors duration-200">
                                        ${product.price?.toLocaleString()}
                                    </p>
                                    {/* Stock */}
                                    <span className="text-sm text-gray-500">
                                        Stock:
                                        <span
                                            className={`font-bold ${product.stock > 10
                                                ? "text-green-600"
                                                : product.stock > 0
                                                    ? "text-yellow-500"
                                                    : "text-red-500"}`}
                                        >
                                            {product.stock > 0 ? product.stock : "Out of Stock"}
                                        </span>
                                    </span>
                                </div>
                                {/* Add to Cart Button */}
                                <AddToCart
                                    product={product}
                                    style="bg-gray-800 hover:bg-gray-900 text-white py-3 px-8 rounded-full text-lg font-medium
                                           transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;

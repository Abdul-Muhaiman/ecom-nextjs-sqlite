import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import { AddToCartButton } from "@/components/AddToCartButton";
import {Product} from "@/types/product";
import React from 'react';
import { ShoppingCart } from 'lucide-react';

// Mock AddToCartButton (Simplified for this context) -  No change, assuming it's correctly implemented
const AddToCart = ({ product, style }: { product: Product; style?: string }) => {
    const icon : React.ReactNode = <ShoppingCart className="w-5 h-5 mr-2 inline-block" />;
    return (
            <AddToCartButton product={product} style={style} icon={icon} />
    );
};

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div
            className="group bg-white/90 border border-gray-100 rounded-2xl overflow-hidden shadow-lg
               hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02]
               hover:border-blue-500/50"
        >
            {/* Image and Link */}
            <Link href={`/products/${product.id}`} className="relative block p-6">
                <div className="relative w-full aspect-square p-4 flex items-center justify-center">
                    <Image
                        src={product.image? product.image : Placeholder}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="transition-transform duration-300 transform group-hover:scale-110"
                        priority
                    />
                </div>
            </Link>

            {/* Product Details */}
            <div className="p-6 space-y-5">
                {/* Category */}
                {product.category && (
                    <p className="text-sm text-blue-500 uppercase tracking-wide font-semibold transition-colors duration-200 group-hover:text-blue-600">
                        {product.category.name}
                    </p>
                )}

                {/* Product Name */}
                <h3
                    className="text-xl font-semibold text-gray-800 overflow-hidden text-ellipsis break-words
                       transition-colors duration-200 group-hover:text-gray-900 line-clamp-2"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                    }}
                >
                    {product.name}
                </h3>

                {/* Product Price */}
                <p className="text-2xl font-bold text-green-500 transition-colors duration-200">
                    ${product.price?.toLocaleString()}
                </p>

                {/* Stock Information */}
                <p className="text-sm text-gray-500">
                    Stock:
                    <span
                        className={`font-bold ${
                            product.stock > 10
                                ? "text-green-600"
                                : product.stock > 0
                                    ? "text-yellow-500"
                                    : "text-red-600"
                        }`}
                    >
                {product.stock > 0 ? product.stock : "Out of Stock"}
            </span>
                </p>

                {/* Add to Cart Button */}
                <AddToCart
                    product={product}
                    style="w-full bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white py-3 px-6 rounded-lg text-sm font-medium
                   transition-all duration-300 transform shadow-sm"
                />
            </div>
        </div>
    );
};

export default ProductCard;
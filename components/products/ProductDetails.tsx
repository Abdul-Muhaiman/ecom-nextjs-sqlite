import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import Placeholder from "@/public/placeholder.png";
import { ProductOld } from "@/types/product";

export default function ProductDetails({ product }: { product: ProductOld }) {
    return (
        <section className="text-gray-600 w-full py-8">
            <div className="flex flex-col lg:flex-row w-full bg-white overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Enlarged Product Image */}
                <div className="relative w-full lg:w-3/5 h-[500px] flex items-center justify-center">
                    <Image
                        src={product.image || Placeholder}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                        className="transition-transform duration-300 object-contain transform hover:scale-105"
                        priority
                    />
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-2/5 p-8 flex flex-col">
                    {/* Category */}
                    <h2 className="text-xs uppercase tracking-widest font-medium text-blue-500 mb-1">
                        {product.category?.name || "Uncategorized"}
                    </h2>

                    {/* Product Name */}
                    <h1 className="text-gray-900 text-4xl font-bold leading-tight mt-2 mb-4">
                        {product.name}
                    </h1>

                    {/* Description */}
                    <p className="leading-relaxed text-base text-gray-700 mb-6">
                        {product.description}
                    </p>

                    {/* Spacer to push price/stock and CTA to the bottom */}
                    <div className="mt-auto">
                        {/* Price and Stock */}
                        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                            <span className="text-2xl font-semibold text-green-600">
                                ${product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">
                                Stock:{" "}
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
                            </span>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-6">
                            <AddToCartButton
                                product={product}
                                style={
                                    "w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg text-base font-medium transition-transform transform hover:scale-105 shadow-md"
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

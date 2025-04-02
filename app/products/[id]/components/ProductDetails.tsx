import Image from "next/image";
import {AddToCartButton} from "@/components/AddToCartButton";
import Placeholder from "@/public/placeholder.png";
import {Product} from "@/types/product";

export default function ProductDetails({product}: { product: Product }) {
    return (
        <section className="text-gray-600 w-full">
            <div className="flex flex-col lg:flex-row w-full bg-white overflow-hidden">
                {/* Enlarged Product Image */}
                <div className="relative w-full lg:w-3/5 h-[500px] flex items-center justify-center">
                    <Image
                        src={product.image || Placeholder}
                        alt={product.name}
                        fill
                        style={{objectFit: "contain"}}
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
                            <AddToCartButton
                                product={product}
                                style={"w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 shadow"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

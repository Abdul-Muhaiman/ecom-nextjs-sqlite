import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import { AddToCartButton } from "@/components/AddToCartButton";
import {Product} from "@/types/product";

export default function ProductCard(props: { product: Product }) {
    return (
        <div
            className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
        >
            {/* Link wraps the entire image area for interaction */}
            <Link href={`/products/${props.product.id}`} className="relative block">
                <div className="relative w-48 h-48 mx-auto mt-4 overflow-hidden rounded-t-lg">
                    <Image
                        src={props.product.image || Placeholder}
                        alt={props.product.name}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="transition-transform duration-300 object-contain transform group-hover:scale-110"
                        priority
                    />
                </div>
            </Link>

            {/* Product Details */}
            <div className="p-4 flex flex-col gap-4">
                {/* Category */}
                {props.product.category && (
                    <p className="text-xs text-blue-600 uppercase tracking-wide font-medium transition-colors duration-200 group-hover:text-blue-500">
                        {props.product.category.name || props.product.categoryId}
                    </p>
                )}

                {/* Product Name */}
                <h3
                    className="text-lg font-bold text-gray-800 overflow-hidden text-ellipsis break-words transition-colors duration-200 group-hover:text-gray-900"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                    }}
                >
                    {props.product.name}
                </h3>

                {/* Product Price */}
                <p className="text-xl font-semibold text-green-600 group-hover:text-green-700 transition-colors duration-200">
                    ${props.product.price.toLocaleString()}
                </p>

                {/* Stock Information */}
                <p className="text-sm text-gray-500">
                    Stock:{" "}
                    <span
                        className={`font-bold ${
                            props.product.stock > 10
                                ? "text-green-600"
                                : props.product.stock > 0
                                    ? "text-yellow-600"
                                    : "text-red-600"
                        }`}
                    >
                        {props.product.stock > 0 ? props.product.stock : "Out of Stock"}
                    </span>
                </p>

                {/* Add to Cart Button */}
                <AddToCartButton
                    product={props.product}
                    style={
                        "mt-2 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium transition-transform transform hover:scale-105 shadow-md"
                    }
                />
            </div>
        </div>
    );
}

import { Product } from "@/types/product";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import Link from "next/link";
import {AddToCartButton} from "@/components/AddToCartButton";

export default async function Page() {
    // Directly fetch data using Prisma
    const products: Product[] = await prisma.product.findMany({
        include: { category: true }, // if you want to include category details
    });

    return (
        <div className="container mx-auto">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                <p className="text-gray-600">Browse through our latest collection!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                        <Link href={`/products/${product.id}`}>
                            <div className="relative w-48 h-48 mt-3 mb-1 mx-auto flex items-center justify-center overflow-hidden rounded-t-md  cursor-pointer">
                                <Image
                                    src={product.image || Placeholder}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="transition-transform duration-300 object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                        <div className="p-4 flex flex-col justify-evenly">
                            <div>
                                {product.category && (
                                    <p className="text-xs text-blue-600 uppercase tracking-wide font-medium group-hover:text-blue-500 transition-colors">
                                        {product.category.name || product.categoryId}
                                    </p>
                                )}
                                <h3
                                    className="mt-2 text-lg font-bold text-gray-800 group-hover:text-gray-900 overflow-hidden text-ellipsis break-words"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                    }}
                                >
                                    {product.name}
                                </h3>
                            </div>
                            <div className={"grow"}></div>
                            <div className="mt-4 space-y-2">
                                <p className="text-lg font-semibold text-green-600 group-hover:text-green-700 transition-colors">
                                    ${product.price}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Stock: <span className="font-bold">{product.stock}</span>
                                </p>
                                <AddToCartButton
                                    product={product}
                                    style={"mt-2 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium transition-transform transform hover:scale-105 shadow"}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

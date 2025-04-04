import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import {AddToCartButton} from "@/components/AddToCartButton";

type product = {
    category: {
        id: number
        name: string
    } | null
} & {
    id: number
    image: string
    name: string
    description: string | null
    price: number
    stock: number
    categoryId: number | null
}

export default function ProductCard(props: { product: product}) {
    return (
        <>

            <div

                className="group block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
            >
                <Link href={`/products/${props.product.id}`}>
                    <div
                        className="relative w-48 h-48 mt-3 mb-1 mx-auto flex items-center justify-center overflow-hidden rounded-t-md cursor-pointer">
                        <Image
                            src={props.product.image || Placeholder}
                            alt={props.product.name}
                            fill
                            style={{objectFit: "contain"}}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="transition-transform duration-300 object-contain"
                            priority
                        />
                    </div>
                </Link>
                <div className="p-4 flex flex-col justify-evenly">
                    <div>
                        {props.product.category && (
                            <p className="text-xs text-blue-600 uppercase tracking-wide font-medium group-hover:text-blue-500 transition-colors">
                                {props.product.category.name || props.product.categoryId}
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
                            {props.product.name}
                        </h3>
                    </div>
                    <div className={"grow"}></div>
                    <div className="mt-4 space-y-2">
                        <p className="text-lg font-semibold text-green-600 group-hover:text-green-700 transition-colors">
                            ${props.product.price}
                        </p>
                        <p className="text-sm text-gray-500">
                            Stock: <span className="font-bold">{props.product.stock}</span>
                        </p>
                        <AddToCartButton
                            product={props.product}
                            style={
                                "mt-2 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium transition-transform transform hover:scale-105 shadow"
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


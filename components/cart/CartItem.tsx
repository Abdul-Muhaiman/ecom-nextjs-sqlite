import {GetCartProduct} from "@/types/cart";
import React from "react";
import Image from "next/image";
import Placeholder from "@/public/placeholder.png";
import DeleteButton from "@/components/cart/DeleteButton";
import QuantityControls from "@/components/cart/QuantityControls";

export default function CartItem({ item, setCartItems }: { item: GetCartProduct; setCartItems: React.Dispatch<React.SetStateAction<GetCartProduct[]>> }) {
    return (
        <div className="flex items-center py-6 border-b border-gray-200 last:border-0">
            {/* Product Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                    src={item.productImage || Placeholder}
                    alt={`Product image of ${item.productName}`}
                    fill
                    className="object-contain rounded-md"
                />
            </div>

            {/* Product Details */}
            <div className="ml-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-tight">{item.productName}</h3>
                <p className="text-gray-600 text-lg">${item.productPrice.toFixed(2)}</p>
                <QuantityControls productId={item.productId} quantity={item.quantity} setCartItems={setCartItems} />
            </div>

            {/* Item Total Price */}
            <div className="text-right ml-8">
                <p className="text-xl font-bold text-gray-800">
                    ${(item.productPrice * item.quantity).toFixed(2)}
                </p>
            </div>

            {/* Delete Button */}
            <DeleteButton productId={item.productId} setCartItems={setCartItems} />
        </div>
    );
}
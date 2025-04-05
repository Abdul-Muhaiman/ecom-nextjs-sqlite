"use client";

import React, {useState} from "react";
import {GetCartProduct} from "@/types/cart";
import {updateCartItemAction} from "@/lib/actions/cart";
import {Minus, Plus} from "lucide-react";

export default function QuantityControls({
                                             productId,
                                             quantity,
                                             setCartItems,
                                         }: {
    productId: number;
    quantity: number;
    setCartItems: React.Dispatch<React.SetStateAction<GetCartProduct[]>>; // Pass setCartItems from parent
}) {
    const [mutatedQuantity, setMutatedQuantity] = useState(quantity);
    const [isUpdating, setIsUpdating] = useState(false);

    const controlQuantity = async () => {
        setIsUpdating(true); // Set loading state
        const updatedItem = await updateCartItemAction(productId, quantity);
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId
                    ? {...item, quantity: mutatedQuantity}
                    : item
            )
        )
        setIsUpdating(false);
        return updatedItem;
    };

    return (
        <div className="flex items-center mt-3">
            {/* Decrease Quantity Button */}
            <button
                onClick={() => {
                    if (mutatedQuantity > 1) {
                        setMutatedQuantity(mutatedQuantity - 1);
                    }
                }}
                className="w-10 h-10 bg-gray-200 rounded-full text-gray-700 flex items-center justify-center
                           hover:bg-gray-300 transition-colors duration-200"
                disabled={isUpdating}
            >
                <Minus className="w-5 h-5" />
            </button>

            {/* Current Quantity Display */}
            <span className="mx-4 text-xl font-semibold min-w-[2.5rem] text-center">{mutatedQuantity}</span>

            {/* Increase Quantity Button */}
            <button
                onClick={() => {
                    setMutatedQuantity(mutatedQuantity + 1);
                }}
                className="w-10 h-10 bg-gray-200 rounded-full text-gray-700 flex items-center justify-center
                           hover:bg-gray-300 transition-colors duration-200"
                disabled={isUpdating}
            >
                <Plus className="w-5 h-5" />
            </button>

            {/* Update Quantity Button */}
            {quantity !== mutatedQuantity && !isUpdating && (
                <button
                    onClick={controlQuantity}
                    className="px-2 py-1 bg-blue-500 ml-3 text-white text-sm rounded-md"
                >
                    Update Quantity
                </button>
            )}

            {/* Optional Loading Indicator */}
            {isUpdating && (
                <span className="ml-4 text-gray-500 text-sm">Updating...</span>
            )}
        </div>
    );
}
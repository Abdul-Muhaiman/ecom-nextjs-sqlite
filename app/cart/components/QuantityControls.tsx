"use client";

import React, { useState } from "react";

interface cartItems {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

export default function QuantityControls({
                                             userId,
                                             productId,
                                             quantity,
                                             setCartItems,
                                         }: {
    userId: number;
    productId: number;
    quantity: number;
    setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>; // Pass setCartItems from parent
}) {
    // State for tracking mutated quantity
    const [mutatedQuantity, setMutatedQuantity] = useState(quantity);
    // State for tracking if the update is in progress
    const [isUpdating, setIsUpdating] = useState(false);

    const controlQuantity = async () => {
        setIsUpdating(true); // Set loading state
        try {
            const response = await fetch(`/api/cart/product/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({ userId, quantity: mutatedQuantity }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to update quantity");
            }

            const data = await response.json();
            console.log("Quantity updated:", data);

            // Update cartItems state in the parent component
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: mutatedQuantity }
                        : item
                )
            );

            // Reset the local state to reflect the updated quantity
            setMutatedQuantity(mutatedQuantity);
        } catch (error) {
            console.error("Error updating product quantity:", error);
        } finally {
            setIsUpdating(false); // Reset loading state
        }
    };

    return (
        <div className="flex items-center">
            {/* Decrease Quantity Button */}
            <button
                onClick={() => {
                    if (mutatedQuantity > 1) {
                        setMutatedQuantity(mutatedQuantity - 1);
                    }
                }}
                className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300"
                disabled={isUpdating} // Disable when updating
            >
                -
            </button>

            {/* Current Quantity Display */}
            <span className="mx-4 text-lg">{mutatedQuantity}</span>

            {/* Increase Quantity Button */}
            <button
                onClick={() => {
                    setMutatedQuantity(mutatedQuantity + 1);
                }}
                className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300"
                disabled={isUpdating} // Disable when updating
            >
                +
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
                <span className="ml-3 text-gray-500 text-sm">Updating...</span>
            )}
        </div>
    );
}

import React from "react";

interface cartItems {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

export default function ClearCartButton({
                                            userId,
                                            setCartItems,
                                        }: {
    userId: number;
    setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
}) {
    const clearCart = async () => {
        try {
            const response = await fetch(`/api/cart/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                return new Error("Failed to delete product");
            }

            const data = await response.json();
            console.log(data.message);

            // Update the local state to remove the item
            setCartItems([]);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <button
            onClick={clearCart}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Clear Cart
        </button>
    );
}

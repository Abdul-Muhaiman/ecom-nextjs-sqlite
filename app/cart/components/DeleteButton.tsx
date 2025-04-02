interface cartItems {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

export default function DeleteButton({
                          userId,
                          productId,
                          setCartItems,
                      }: {
    userId: number;
    productId: number;
    setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
}) {
    const deleteProduct = async () => {
        try {
            const response = await fetch(`/api/cart/remove/${productId}`, {
                method: "DELETE",
                body: JSON.stringify({ userId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            const data = await response.json();
            console.log(data);

            // Update the local state to remove the item
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.productId !== productId)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <button
            onClick={deleteProduct}
            className="ml-4 text-gray-500 hover:text-red-500 focus:outline-none"
        >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-.894.553L4.382 4H1a1 1 0 000 2h1v10a2 2 0 002 2h12a2 2 0 002-2V6h1a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0014 2H6zM9 8a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    );
}

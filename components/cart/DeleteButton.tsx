import {removeCartItemAction} from "@/lib/actions/cart";
import {GetCartProduct} from "@/types/cart";
import React from "react";
import {Trash2} from "lucide-react";

export default function DeleteButton({
                                         productId,
                                         setCartItems,
                                     }: {
    productId: number;
    setCartItems: React.Dispatch<React.SetStateAction<GetCartProduct[]>>;
}) {
    const deleteProduct = async () => {

        await removeCartItemAction(productId);
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.productId !== productId)
        );
    };

    return (
        <button
            onClick={deleteProduct}
            className="ml-6 text-gray-500 hover:text-red-500 focus:outline-none transition-colors duration-300"
        >
            <Trash2 className="w-6 h-6" />
        </button>
    );
}
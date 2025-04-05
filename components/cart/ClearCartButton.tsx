import React from "react";
import {clearCartAction} from "@/lib/actions/cart";
import {GetCartProduct} from "@/types/cart";
import {XCircle} from "lucide-react";
export default function ClearCartButton({
                                            setCartItems,
                                        }: {
    setCartItems: React.Dispatch<React.SetStateAction<GetCartProduct[]>>;
}) {
    const clearCart = async () => {
        const message = await clearCartAction();
        console.log(message);
        setCartItems([]);
    };
    return (
        <button
            onClick={clearCart}
            className="bg-red-500/90 hover:bg-red-500 text-white py-3 px-6 rounded-full transition-colors duration-300
                       flex items-center gap-2 text-lg font-medium"
        >
            <XCircle className="w-5 h-5" />
            Clear Cart
        </button>
    );
}



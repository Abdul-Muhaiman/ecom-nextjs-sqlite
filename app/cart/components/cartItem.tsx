import Image from "next/image";
import React from "react";
import Placeholder from "@/public/placeholder.png";

type ItemType = {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
};

type CartItemType = {
    item: ItemType;
    decrement: () => void; // For decreasing quantity
    increment: () => void; // For increasing quantity
    onDelete: () => void; // For deleting an item
};

const CartItem: React.FC<CartItemType> = ({ item, decrement, increment, onDelete }) => {
    return (
        <div className="flex items-center py-4 border-b border-gray-200">
            {/* Product Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                    src={item.image || Placeholder}
                    alt={item.name}
                    fill
                    className="object-contain rounded-md"
                    sizes="100vw"
                />
            </div>

            {/* Product Details */}
            <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-blue-800">{item.name}</h3>
                <p className="text-blue-600">${item.price.toFixed(2)}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                    <button
                        className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300"
                        onClick={decrement}
                        aria-label={`Decrease quantity of ${item.name}`}
                    >
                        -
                    </button>
                    <span className="mx-4 text-lg">{item.quantity}</span>
                    <button
                        className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300"
                        onClick={increment}
                        aria-label={`Increase quantity of ${item.name}`}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
                <p className="text-lg font-bold text-blue-800">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>

            {/* Delete Button */}
            <button
                onClick={onDelete}
                className="ml-4 text-blue-500 hover:text-red-500 focus:outline-none"
                aria-label={`Remove ${item.name} from cart`}
            >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-.894.553L4.382 4H1a1 1 0 000 2h1v10a2 2 0 002 2h12a2 2 0 002-2V6h1a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0014 2H6zM9 8a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CartItem;

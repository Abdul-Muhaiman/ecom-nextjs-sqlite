"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

export default function CartPage() {
    const { cart } = useCartStore(); // Retrieve cart state from Zustand
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productIds = cart.map((item) => item.productId); // Extract product IDs from cart

            if (productIds.length === 0) return; // Skip if no products in cart

            try {
                const response = await fetch("/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productIds }), // Pass product IDs to API
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: Product[] = await response.json();
                setProducts(data); // Update state with product details
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [cart]);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {products.length === 0 ? (
                <p>Your cart is empty or loading...</p>
            ) : (
                <ul className="space-y-4">
                    {cart.map((item) => {
                        const product = products.find((p) => p.id === item.productId);

                        // Safely handle cases where the product might be undefined
                        if (!product || product.price === undefined || product.name === undefined) {
                            return (
                                <li key={item.productId} className="text-red-500">
                                    Error: Product details not found.
                                </li>
                            );
                        }

                        return (
                            <li
                                key={item.productId}
                                className="flex justify-between items-center border p-4 rounded"
                            >
                                <div>
                                    <h2 className="text-lg font-medium">{product.name}</h2>
                                    <p className="text-gray-500">
                                        Price: ${product.price.toFixed(2)} | Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p className="text-green-600 font-bold">
                                    Total: ${(product.price * item.quantity).toFixed(2)}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

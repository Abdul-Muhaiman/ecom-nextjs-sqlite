"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AddToCartButton = ({
                                    product,
                                    style,
                                }: {
    product?: Product;
    style?: string;
}) => {
    const { addToCart } = useCartStore();
    const {data: session} = useSession();
    const router = useRouter();

    const handleAdd = async () => {
        // Redirect to log in if not authenticated
        if (!session?.user) {
            router.push("/login");
            return;
        }

        // Add product to the cart
        if (product) {
            await addToCart(session.user.id, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            });
        }

    };

    return (
        <button className={style} onClick={handleAdd}>
            Add to Cart
        </button>
    );
};

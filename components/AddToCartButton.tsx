"use client";

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
    const {data: session} = useSession();
    const router = useRouter();

    const handleAdd = async () => {
        // Redirect to log in if not authenticated
        if (!session?.user) {
            router.push("/login");
            return;
        }

        const response = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({
                userId: session.user.id,
                productId: product?.id as number,
                productName: product?.name as string,
                productImage: product?.image as string,
                productPrice: product?.price as number,
                quantity: 1
            })
        })

        const data = await response.json();
        console.log("data", data);

        // Add product to the cart
        // if (product) {
        //     await addToCart(session.user.id, {
        //         productId: product.id,
        //         name: product.name,
        //         price: product.price,
        //         quantity: 1,
        //     });
        // }

    };

    return (
        <button className={style} onClick={handleAdd}>
            Add to Cart
        </button>
    );
};

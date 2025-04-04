import {cache} from "react";
import {requireAuth} from "@/lib/dal/auth";
import {User} from "@/types/user";
import prisma from "@/lib/prisma";

type CartProduct = {
    productId: number,
    productName: string,
    productPrice: number,
    productImage: string | null,
    quantity: number
}

export const addToCart_DAL = cache(async (
        product : CartProduct
    ) => {
        const user: User = await requireAuth();

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: user.id,
                productId: product.productId
            }
        })

        let cartItem;

        if (existingCartItem) {
            // If the product exists, increase the quantity
            cartItem = await prisma.cartItem.update({
                where: {id: existingCartItem.id},
                data: {
                    quantity: existingCartItem.quantity + product.quantity, // Increase quantity
                },
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    userId: user.id,
                    productId:product.productId,
                    productName: product.productName,
                    productPrice: product.productPrice,
                    productImage: product.productImage,
                    quantity: product.quantity,
                },
            });
        }
    return cartItem;
    }
);
import {cache} from "react";
import {requireAuth} from "@/lib/dal/auth";
import {User} from "@/types/user";
import prisma from "@/lib/prisma";
import {AddCartProduct, GetCartProduct} from "@/types/cart";

export const getCart_DAL= cache(async () => {
    const user: User = await requireAuth();

    const cart: GetCartProduct[] = await prisma.cartItem.findMany({
        where: { userId: user.id },
        select: {
            id: true,
            userId: true,
            productId: true,
            productName: true,
            productPrice: true,
            productImage: true,
            quantity: true,
        }
    });

    return cart;
})

export const addToCart_DAL = cache(async (product : AddCartProduct) => {
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
});


export const clearCart_DAL = cache(async () => {
    const user: User = await requireAuth();

    await prisma.cartItem.deleteMany({
        where: { userId: user.id },
    });

    return {message: "Carts cleared successfully."};
});

export const removeCartItem_DAL = cache(async ( prodId: number ) => {
    const user: User = await requireAuth();

    const deletedItem = await prisma.cartItem.deleteMany({
        where: {
            userId: user.id,
            productId: prodId,
        },
    });

    if (!deletedItem.count) { // .count ensures Prisma deleted at least one row
        return { error: "Failed to delete item from cart" }
    }

    return {
        message: "Item removed from cart successfully",
        productId: prodId,
    }
});
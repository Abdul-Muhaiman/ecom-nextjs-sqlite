import { requireAuth } from "@/lib/dal/auth";
import prisma from "@/lib/prisma";
import { AddCartProduct, GetCartProduct } from "@/types/cart";
import { User } from "@/types/user";

// Fetch Cart Items
export const getCart_DAL = async () => {
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
        },
    });

    return cart;
};

// Add Product to Cart
export const addToCart_DAL = async (product: AddCartProduct) => {
    const user: User = await requireAuth();

    const existingCartItem = await prisma.cartItem.findFirst({
        where: {
            userId: user.id,
            productId: product.productId,
        },
    });

    let cartItem;

    if (existingCartItem) {
        // If the product exists, increase the quantity
        cartItem = await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: {
                quantity: existingCartItem.quantity + product.quantity, // Increase quantity
            },
        });
    } else {
        cartItem = await prisma.cartItem.create({
            data: {
                userId: user.id,
                productId: product.productId,
                productName: product.productName,
                productPrice: product.productPrice,
                productImage: product.productImage,
                quantity: product.quantity,
            },
        });
    }

    return cartItem;
};

// Clear Cart
export const clearCart_DAL = async () => {
    const user: User = await requireAuth();

    await prisma.cartItem.deleteMany({
        where: { userId: user.id },
    });

    return { message: "Cart cleared successfully." };
};

// Remove Cart Item
export const removeCartItem_DAL = async (prodId: number) => {
    const user: User = await requireAuth();

    const deletedItem = await prisma.cartItem.deleteMany({
        where: {
            userId: user.id,
            productId: prodId,
        },
    });

    if (!deletedItem.count) {
        return { error: "Failed to delete item from cart" };
    }

    return {
        message: "Item removed from cart successfully",
        productId: prodId,
    };
};

// Update Cart Item Quantity
export const updateCartItem_DAL = async (prodId: number, quantity: number) => {
    const user: User = await requireAuth();

    const updatedItem = await prisma.cartItem.updateMany({
        where: {
            userId: user.id,
            productId: prodId,
        },
        data: {
            quantity,
        },
    });

    if (!updatedItem.count) {
        return { error: "Failed to update item quantity in cart" };
    }

    return {
        message: "Item updated successfully",
        productId: prodId,
    };
};

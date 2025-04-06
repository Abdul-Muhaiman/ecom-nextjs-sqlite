"use server";

import {addToCart_DAL, clearCart_DAL, getCart_DAL, removeCartItem_DAL, updateCartItem_DAL,} from "@/lib/dal/cart";
import {AddCartProduct} from "@/types/cart";

// Fetch Cart Items
export async function getCartItemsAction() {
    try {
        return await getCart_DAL();
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Unable to fetch cart items.");
    }
}

// Add Product to Cart
export async function addToCartAction({
                                          productId,
                                          productName,
                                          productPrice,
                                          productImage,
                                          quantity,
                                      }: AddCartProduct) {
    try {
        const addProduct = {
            productId,
            productName,
            productPrice,
            productImage,
            quantity,
        };
        const addedCartItem = await addToCart_DAL(addProduct);
        return {message: "Added to cart successfully.", addedCartItem};
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw new Error("Unable to add item to cart.");
    }
}

// Clear Cart
export async function clearCartAction() {
    try {
        const {message} = await clearCart_DAL();
        return {message};
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw new Error("Unable to clear the cart.");
    }
}

// Remove Cart Item
export async function removeCartItemAction(prodId: number) {
    try {
        const {error, message, productId} = await removeCartItem_DAL(prodId);
        if (error) throw new Error(error);
        return {message, productId};
    } catch (error) {
        console.error("Error removing cart item:", error);
        throw new Error("Unable to remove item from cart.");
    }
}

// Update Cart Item Quantity
export async function updateCartItemAction(prodId: number, quantity: number) {
    try {
        const {error, message, productId} = await updateCartItem_DAL(prodId, quantity);
        if (error) throw new Error(error);
        return {message, productId};
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        throw new Error("Unable to update item quantity in cart.");
    }
}

"use server"

import {addToCart_DAL, clearCart_DAL, getCart_DAL, removeCartItem_DAL} from "@/lib/dal/cart";
import {AddCartProduct} from "@/types/cart";

export async function getCartItemsAction(){
    return await getCart_DAL();
}

export async function addToCartAction({ productId, productName, productPrice, productImage, quantity }: AddCartProduct) {
    const addProduct = {
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        quantity: quantity
    }
    await addToCart_DAL(addProduct);
    return {message: `Added to cart successfully.`};
}

export async function clearCartAction(){
    const { message } = await clearCart_DAL();
    return message;
}

export async function removeCartItemAction( prodId : number ) {
    const { error, message, productId } = await removeCartItem_DAL(prodId);

    if(error){
        throw error;
    }

    return {message, productId};
}
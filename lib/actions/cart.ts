"use server"

import {Product} from "@prisma/client";
import {addToCart_DAL} from "@/lib/dal/cart";

export async function addToCartAction(product: Product) {
    const addProduct = {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        quantity: 1
    }
    await addToCart_DAL(addProduct);
    return {message: `Added to cart successfully.`};
}
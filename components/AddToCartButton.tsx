"use client";

import React from "react";
import {addToCartAction} from "@/lib/actions/cart";
import {AddCartProduct} from "@/types/cart";
import {Product} from "@/types/product";

export const AddToCartButton = ({product, style, icon}: {
    product: Product;
    style?: string;
    icon?: React.ReactNode;
}) => {
    const handleAdd = async () => {
        if (!product) {
            return;
        }

        const addProduct : AddCartProduct = {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productImage: product.image,
            quantity: 1,
        }

        const {message} = await addToCartAction(addProduct);
        console.log(message);

    };

    return (
        <button className={style} onClick={handleAdd}>
            {icon}
            Add to Cart
        </button>
    );
};

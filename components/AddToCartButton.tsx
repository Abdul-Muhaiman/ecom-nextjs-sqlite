"use client";

import {Product} from "@prisma/client";
import React from "react";
import {addToCartAction} from "@/lib/actions/cart";

export const AddToCartButton = ({product, style, icon}: {
    product?: Product;
    style?: string;
    icon?: React.ReactNode;
}) => {
    const handleAdd = async () => {
        if (!product) {
            return;
        }

        const {message} = await addToCartAction(product);
        console.log(message);

    };

    return (
        <button className={style} onClick={handleAdd}>
            {icon}
            Add to Cart
        </button>
    );
};

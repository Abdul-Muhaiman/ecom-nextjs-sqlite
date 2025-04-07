"use server"

import {createProduct_DAL} from "@/lib/dal/product";

type AddNewProductState = {
    message: string;
    error: boolean;
};

export async function addNewProductAction(
    prevState: AddNewProductState,
    formData: unknown
): Promise<AddNewProductState> {
    // Check if formData is an instance of FormData
    if (!(formData instanceof FormData)) {
        return { ...prevState, message: "Got no form data", error: true };
    }

    // Extract values from the FormData
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const category = formData.get("category");
    const image = formData.get("image");

    // Validate required fields
    if (!name || !price || !stock || !category) {
        return {
            ...prevState,
            message: "All fields are required. Please fill in all fields.",
            error: true,
        };
    }

        const newProduct = {
            name: name.toString(),
            description: description? description.toString() : undefined,
            price: parseFloat(price as string),
            stock: parseInt(stock as string, 10),
            categoryId: parseInt(category as string),
            image: image? image.toString() : undefined,
        };

        await createProduct_DAL(newProduct)

        // Return success state
        return { ...prevState, message: "Product added successfully!", error: false };
}

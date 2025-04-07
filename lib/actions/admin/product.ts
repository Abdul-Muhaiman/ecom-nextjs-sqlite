"use server"

import {createProduct_DAL, deleteProduct_DAL, editProductDetails_DAL, getProductById_DAL} from "@/lib/dal/product";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

type ProductState = {
    message: string;
    error: boolean;
};

export async function addNewProductAction(
    prevState: ProductState,
    formData: unknown
): Promise<ProductState> {
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

export async function editProductAction(
    prevState: ProductState, // Accept previous state as the first argument
    formData: FormData           // Accept FormData as the second argument
): Promise<ProductState> {   // Return type matches the state type

    // Check if formData is a valid FormData instance
    if (!(formData instanceof FormData)) {
        console.error("formData received is not an instance of FormData:", formData);
        return { message: "Invalid form data received.", error: true };
    }

    // Extract form fields
    const id = formData.get("id");
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const stock = formData.get("stock") as string;
    const image = formData.get("image") as string;
    const categoryId = formData.get("categoryId");

    // Validate required fields
    if (!id || !name || !price || !stock) {
        return { message: "ID, Name, Price, and Stock are required.", error: true };
    }

    const productId = parseInt(id as string, 10);
    if (isNaN(productId)) {
        return { message: "Invalid Product ID.", error: true };
    }

    // Validate numerical fields
    const priceValue = parseFloat(price);
    const stockValue = parseInt(stock, 10);
    if (isNaN(priceValue) || isNaN(stockValue)) {
        return { message: "Price and Stock must be valid numbers.", error: true };
    }

    // Retrieve the original product data
    const originalProduct = await getProductById_DAL(productId);
    if (!originalProduct) {
        return { message: `Product with ID ${productId} not found.`, error: true };
    }

    // Check if any data has changed
    const isDataChanged =
        name !== originalProduct.name ||
        description !== originalProduct.description ||
        priceValue !== originalProduct.price ||
        stockValue !== originalProduct.stock ||
        image !== originalProduct.image ||
        (categoryId && parseInt(categoryId as string, 10) !== originalProduct.categoryId);

    if (!isDataChanged) {
        return { message: "No changes detected. Please modify one or more fields.", error: true };
    }

    // Construct the updated product object
    const updatedProduct = {
        name,
        description: description || null,
        price: priceValue,
        stock: stockValue,
        image: image || null,
        categoryId: categoryId ? parseInt(categoryId as string, 10) : null,
    };

    // Update the product in the database
    await editProductDetails_DAL(productId,updatedProduct);

    // Redirect to the updated product's page (ensure it runs only on success)
    redirect(`/admin/products/${productId}`);

    // Return success message (this won't run after redirect, but ensures completion)
}

export async function deleteProductAction(id: number) {
    await deleteProduct_DAL(id);

    revalidatePath("/admin/products/");
    return { message: `User with ID ${id} deleted.` };
}
"use server"

import {createCategory_DAL, deleteCategory_DAL, editCategoryDetails_DAL, getCategoryById_DAL} from "@/lib/dal/category";
import {redirect} from "next/navigation";
import {deleteProduct_DAL} from "@/lib/dal/product";
import {revalidatePath} from "next/cache";



type CategoryState = {
    message: string;
    error: boolean;
};

export async function addNewCategoryAction(
    prevState: CategoryState,
    formData: unknown
): Promise<CategoryState> {
    // Validate that formData is an instance of FormData
    if (!(formData instanceof FormData)) {
        console.error("formData received is not an instance of FormData:", formData);
        return { ...prevState, message: "Invalid form data received.", error: true };
    }

    // Extract values from the FormData
    const name = formData.get("name");

    // Validate required fields
    if (!name) {
        return {
            ...prevState,
            message: "Category name is required. Please provide a valid name.",
            error: true,
        };
    }

    const newCategory = {
        name: name.toString(),
    };

    try {
        // Create the new category using the DAL function
        await createCategory_DAL(newCategory);

        // Return success state
        return { ...prevState, message: "Category added successfully!", error: false };
    } catch (error) {
        console.error("Error adding category:", error);

        // Handle errors gracefully and provide feedback
        return {
            ...prevState,
            message: "An error occurred while adding the category. Please try again.",
            error: true,
        };
    }
}

export async function editCategoryAction(
    prevState: CategoryState, // Accept previous state
    formData: FormData           // Accept form data
): Promise<CategoryState> {  // Return updated state

    // Check if formData is valid
    if (!(formData instanceof FormData)) {
        console.error("formData received is not an instance of FormData:", formData);
        return { message: "Invalid form data received.", error: true };
    }

    // Extract form fields
    const id = formData.get("id");
    const name = formData.get("name") as string;

    // Validate fields
    if (!id || !name) {
        return { message: "ID and Name are required fields.", error: true };
    }

    const categoryId = parseInt(id as string, 10);
    if (isNaN(categoryId)) {
        return { message: "Invalid Category ID.", error: true };
    }

    // Retrieve the original category data
    const originalCategory = await getCategoryById_DAL(categoryId);
    if (!originalCategory) {
        return { message: `Category with ID ${categoryId} not found.`, error: true };
    }

    // Compare original and new data
    const isDataChanged = name !== originalCategory.name;
    if (!isDataChanged) {
        return { message: "No changes detected. Please modify the category name.", error: true };
    }

    // Update category in the database
    await editCategoryDetails_DAL(categoryId, { name });

    // Redirect after successful update
    redirect(`/admin/categories/${categoryId}`);
}

export async function deleteCategoryAction(id: number) {
    await deleteCategory_DAL(id);

    revalidatePath("/admin/categories/");
    return { message: `User with ID ${id} deleted.` };
}
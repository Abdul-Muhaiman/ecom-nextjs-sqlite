import prisma from "@/lib/prisma";
import {cache} from "react";
import {requireAdmin} from "@/lib/dal/auth"; // Adjust the import path as needed

// Fetch a category by ID
export const getCategoryById_DAL = cache(async (id: number) => {
    return prisma.category.findUnique({
        where: { id },
        include: { products: true }, // Include related products if needed
    });
});

// Fetch all categories
export const getAllCategories_DAL = cache(async () => {
    return prisma.category.findMany({
        include: { products: true }, // Include related products if needed
    });
});

// Create a new category
export const createCategory_DAL = async (data: { name: string }) => {
    // Ensure admin privileges
    await requireAdmin();

    return prisma.category.create({
        data: {
            name: data.name,
        },
    });
};

// Update an existing category
export const editCategoryDetails_DAL = async (
    id: number,
    data: Partial<{ name: string }>
) => {
    // Ensure admin privileges
    await requireAdmin();

    return prisma.category.update({
        where: { id },
        data: {
            name: data.name,
        },
    });
};

// Delete a category (soft delete)
export const deleteCategory_DAL = async (id: number) => {
    // Ensure admin privileges
    await requireAdmin();

    // Check if the category has associated products
    const products = await prisma.product.findFirst({
        where: { categoryId: id },
    });

    if (products) {
        throw new Error("Cannot delete a category that has associated products.");
    }

    return prisma.category.update({
        where: {id: id},
        data: {
            deleted: true,
            deletedDate: new Date(),
        }
    })
};

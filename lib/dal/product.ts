// lib/dal/products.ts
import {cache} from 'react';
import prisma from '@/lib/prisma';
import {requireAdmin} from './auth';

// Public: Get all products (no auth required)
export async function getProducts_DAL({
                                      page = 1,
                                      limit = 10,
                                      categoryId
                                  }: {
    page?: number;
    limit?: number;
    categoryId?: number;
} = {}) {
    const skip = (page - 1) * limit;

    const where = categoryId ? { categoryId } : {};

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            include: { category: true },
            skip,
            take: limit,
            orderBy: { id: 'desc' }
        }),
        prisma.product.count({ where })
    ]);

    return {
        products,
        pagination: {
            total,
            pages: Math.ceil(total / limit),
            page,
            limit
        }
    };
}

// Public: Get product by ID (no auth required)
export const getProductById = cache(async (id: number) => {
    return prisma.product.findUnique({
        where: {id},
        include: {category: true}
    });
});

// Admin only: Create product
export const createProduct_DAL = async (data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    categoryId?: number;
}) => {
    // Ensure user is admin
    await requireAdmin();


    return prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            image: data.image? data.image : "",
            categoryId: data.categoryId,
        }
    });
};

// Admin only: Update product
export const updateProduct = async (
    id: number,
    data: Partial<{
        name: string;
        description: string;
        price: number;
        stock: number;
        image: string;
        categoryId: number;
    }>
) => {
    // Ensure user is admin
    await requireAdmin();

    return prisma.product.update({
        where: {id},
        data
    });
};

// Admin only: Delete product
export const deleteProduct = async (id: number) => {
    // Ensure user is admin
    await requireAdmin();

    // Check if product is in any orders
    const orderItems = await prisma.orderItem.findFirst({
        where: {productId: id}
    });

    if (orderItems) {
        throw new Error('Cannot delete product that has been ordered');
    }

    return prisma.product.delete({
        where: {id}
    });
};
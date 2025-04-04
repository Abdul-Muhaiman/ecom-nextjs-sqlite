// lib/dal/orders.ts
import { cache } from 'react';
import prisma from '@/lib/prisma';
import { requireAuth, requireAdmin } from './auth';

// Get orders for the current user
export const getUserOrders = cache(async () => {
    const user = await requireAuth();

    return prisma.order.findMany({
        where: { userId: user.id },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
});

// Get specific order (with authorization check)
export const getOrderById = cache(async (orderId: number) => {
    const user = await requireAuth();

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    // Authorization check: users can only see their own orders, admins can see all
    if (!order || (order.userId !== user.id && user.role !== 'admin')) {
        return null;
    }

    return order;
});

type OrderParams = {
    page?: number;
    limit?: number;
    status?: string;
}

// Admin only: Get all orders
export const getAllOrders = cache(async ({
                                             page = 1,
                                             limit = 10,
                                             status
                                         } : OrderParams = {}) => {
    // Ensure user is admin
    await requireAdmin();

    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                items: {
                    include: {
                        product: true
                    }
                }
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.order.count({ where })
    ]);

    return {
        orders,
        pagination: {
            total,
            pages: Math.ceil(total / limit),
            page,
            limit
        }
    };
});

// Admin only: Update order status
export const updateOrderStatus = async (orderId: number, status: string) => {
    // Ensure user is admin
    await requireAdmin();

    return prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};
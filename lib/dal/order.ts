// lib/dal/orders.ts
import { cache } from 'react';
import prisma from '@/lib/prisma';
import { requireAuth, requireAdmin } from './auth';
import { calculateCommissionsConcurrent } from "@/lib/commission";

type OrderItemCreateInput = {
    productId: number;
    quantity: number;
    price: number;
}

export const createUserOrder = async () => {
    // Step 1: Authenticate and get the user
    const user = await requireAuth();

    // Step 2: Fetch user's cart items
    const cartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
        include: {
            product: true, // Include product details (price, stock, name)
        },
    });

    // Step 3: Validate cart items
    if (cartItems.length === 0) {
        return { error: "Cart is empty!" };
    }

    // Step 4: Validate stock and calculate the total order amount
    let calculatedAmount = 0;
    const orderItemsData : OrderItemCreateInput[] = []; // Prepare data for OrderItem creation

    for (const item of cartItems) {
        if (!item.product) {
            throw new Error(`Product details missing for cart item ID ${item.id}.`);
        }

        if (item.quantity > item.product.stock) {
            throw new Error(
                `Insufficient stock for ${item.product.name}. Requested: ${item.quantity}, Available: ${item.product.stock}`
            );
        }

        // Calculate subtotal for this item using the current product price
        calculatedAmount += item.quantity * item.product.price;

        // Prepare OrderItem data
        orderItemsData.push({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price, // Store price at the time of order
        });
    }

    // Step 5: Perform transaction (create order, decrement stock, clear cart)
    let newOrder;
    try {
        newOrder = await prisma.$transaction(async (tx) => {
            // Create the Order record
            const order = await tx.order.create({
                data: {
                    userId: user.id,
                    amount: calculatedAmount,
                    status: "PENDING", // Initial status of the order
                },
            });

            // Create associated OrderItem records
            await tx.orderItem.createMany({
                data: orderItemsData.map((item) => ({
                    ...item,
                    orderId: order.id, // Link to the newly created order
                })),
            });

            // Decrement stock for each purchased product
            for (const item of cartItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            // Clear the user's cart
            await tx.cartItem.deleteMany({
                where: { userId: user.id },
            });

            return order; // Return the newly created order
        });
    } catch (error) {
        console.error("Transaction failed:", error);
        throw new Error("Failed to process the order transaction. Please try again.");
    }

    // Step 6: Calculate commissions (if applicable)
    if (newOrder) {
        await calculateCommissionsConcurrent(user.id, newOrder.id, newOrder.amount);
    }

    // Step 7: Return the newly created order
    return {
        message: "Order placed successfully!",
        orderId: newOrder.id,
    };
};


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
                select: {
                    orderId: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        }
                    }
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
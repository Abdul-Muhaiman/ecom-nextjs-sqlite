
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateCommissionsConcurrent } from "@/lib/commission"; // Assuming this remains relevant
// Import your Address type if you pass it from the frontend/context
// import { Address } from '@/context/AddressContext';

// Define the expected shape of the request body
// We only need userId; address is optional but recommended
interface OrderRequestBody {
    userId: number;
    // shippingAddress: Address; // <-- Add this if sending address from frontend
}

// Define the structure for the data needed to create an OrderItem
// (before adding the orderId later)
interface OrderItemCreateInput {
    productId: number;
    quantity: number;
    price: number;
}

export async function POST(req: NextRequest) {
    try {
        // 1. Parse Request Body & Get User ID (and potentially address)
        const body: OrderRequestBody = await req.json();
        const { userId /*, shippingAddress */ } = body; // Destructure address if sent

        // --- Basic Input Validation ---
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required!" },
                { status: 400 }
            );
        }
        // Add validation for shippingAddress if required

        // 2. Verify User Exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // 3. Fetch User's Cart Items (including Product data for price/stock)
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: userId },
            include: {
                product: true, // Include product details (price, stock, name)
            },
        });

        // --- Cart Validation ---
        if (cartItems.length === 0) {
            return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
        }

        // 4. Validate Stock & Calculate Total Amount (Server-Side)
        let calculatedAmount = 0;
        const orderItemsData: OrderItemCreateInput[] = []; // Prepare data for OrderItem creation

        for (const item of cartItems) {
            if (!item.product) {
                // Should not happen if FK constraints are okay, but good check
                return NextResponse.json(
                    { error: `Product details missing for cart item ID ${item.id}.` },
                    { status: 500 }
                );
            }
            if (item.quantity > item.product.stock) {
                return NextResponse.json(
                    {
                        error: `Insufficient stock for ${item.product.name}. Requested: ${item.quantity}, Available: ${item.product.stock}`,
                    },
                    { status: 409 } // 409 Conflict is appropriate for stock issues
                );
            }
            // Calculate subtotal for this item using CURRENT product price
            calculatedAmount += item.quantity * item.product.price;

            // Prepare OrderItem data (price stored is the one at time of order)
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price, // Store price at the time of order
            });
        }

        // 5. Database Transaction (Atomicity: All succeed or all fail)
        let newOrder;
        try {
            newOrder = await prisma.$transaction(async (tx) => {
                // a. Create the Order record
                const order = await tx.order.create({
                    data: {
                        userId: userId,
                        amount: calculatedAmount, // Use server-calculated amount
                        status: "PENDING", // Or your initial order status
                        // Add shippingAddress here if you modified the schema
                        // shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : undefined, // Example if using JSON field
                    },
                });

                // b. Create OrderItem records linking products to this order
                await tx.orderItem.createMany({
                    data: orderItemsData.map(item => ({
                        ...item,
                        orderId: order.id, // Link each item to the newly created order
                    })),
                });

                // c. Decrement stock for each product purchased
                for (const item of cartItems) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: {
                            stock: {
                                decrement: item.quantity,
                            },
                        },
                    });
                    // Optional: Add an extra check within the transaction update itself
                    // This ensures atomicity if stock changes between initial check and update
                    // However, the initial check + transaction usually suffices
                    // const updatedProduct = await tx.product.update({ ... });
                    // if (updatedProduct.stock < 0) {
                    //    throw new Error(`Stock became negative for product ${item.productId}`);
                    // }
                }

                // d. Clear the user's cart
                await tx.cartItem.deleteMany({
                    where: { userId: userId },
                });

                // Return the created order from the transaction scope
                return order;
            });

        } catch (error: unknown) { // 'unknown' keeps things type-safe
            // Ensure 'error' is of type 'Error' before accessing its properties
            if (error instanceof Error) {
                console.error("Transaction failed:", error.message);

                if (error.message.includes("Stock became negative")) {
                    return NextResponse.json(
                        { error: "Stock level changed during transaction. Please try again." },
                        { status: 409 }
                    );
                }
            } else {
                // Handle unexpected error types
                console.error("Transaction failed with an unknown error:", error);
            }

            return NextResponse.json(
                { error: "Failed to process order transaction. Please try again." },
                { status: 500 }
            );
        }

        // --- Transaction Successful ---

        // 6. Calculate Commissions (if applicable, after successful order creation)
        // Ensure newOrder is defined before proceeding
        if (!newOrder) {
            // This case should ideally be caught by the transaction error handling
            console.error("Order creation successful but newOrder object is missing.");
            return NextResponse.json(
                { error: "Order processed but failed to retrieve order details." },
                { status: 500 }
            );
        }

        const commissionResult = await calculateCommissionsConcurrent(
            userId,
            newOrder.id, // Use the ID from the created order
            newOrder.amount // Use the amount from the created order
        );

        // 7. Return Success Response
        return NextResponse.json(
            {
                message: "Order placed successfully!",
                orderId: newOrder.id,
                // Optionally include commission calculation status/message
                commissionStatus: commissionResult.message,
            },
            { status: 201 }
        );

    } catch (error) {
        // General error catching
        console.error("Error processing order:", error);
        return NextResponse.json(
            { error: "An unexpected server error occurred." },
            { status: 500 }
        );
    }
}
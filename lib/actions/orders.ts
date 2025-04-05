"use server";

import { createUserOrder } from "@/lib/dal/order";

export async function createOrderAction() {
    try {
        const result = await createUserOrder(); // Call the DAL function to create an order

        if (result.error) {
            // Handle errors gracefully (e.g., empty cart)
            throw new Error(result.error);
        }

        return {
            message: result.message,
            orderId: result.orderId, // Return order details to the frontend
        };
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order. Please try again.");
    }
}
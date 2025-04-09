"use server";

import {getOrderById, updateOrderStatus} from "@/lib/dal/order";
import {redirect} from "next/navigation";

type OrderState = {
    message: string;
    error: boolean;
};

export async function updateOrderDetailsAction(
    prevState: OrderState, // Accept previous state
    formData: FormData     // Accept form data
) {   // Return updated state

    // Check if formData is valid
    if (!(formData instanceof FormData)) {
        console.error("formData received is not an instance of FormData:", formData);
        return { message: "Invalid form data received.", error: true };
    }

    // Extract form fields
    const id = formData.get("id");
    const status = formData.get("status") as string;

    // Validate fields
    if (!id || !status) {
        return { message: "Order ID and Status are required fields.", error: true };
    }

    const orderId = parseInt(id as string, 10);
    if (isNaN(orderId)) {
        return { message: "Invalid Order ID.", error: true };
    }

    console.info(`Updating order ID: ${orderId} with new status: ${status}`);

    // Retrieve original order data (optional)
    const originalOrder = await getOrderById(orderId); // Assuming you have this DAL function
    if (!originalOrder) {
        console.error(`Order with ID ${orderId} not found.`);
        return { message: `Order with ID ${orderId} not found.`, error: true };
    }

    // Compare original and new data
    const isStatusChanged = status !== originalOrder.status;
    if (!isStatusChanged) {
        return { message: "No changes detected. Please modify the order status.", error: true };
    }

    // Update order in the database
    await updateOrderStatus(orderId, status.toUpperCase()); // Call to your DAL function for updating the status

    // Redirect after successful update (optional)
    redirect(`/admin/orders/${orderId}`); // Redirects to updated order page
}

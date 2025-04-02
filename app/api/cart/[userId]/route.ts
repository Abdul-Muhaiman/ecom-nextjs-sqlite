import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        // Extract userId from params
        const { userId } = await params;

        // Validate userId
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 } // Bad Request
            );
        }

        // Fetch cart items from the database
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: parseInt(userId) }, // Ensure userId is an integer
        });

        // Return the cart items as a JSON response
        return NextResponse.json(cartItems, { status: 200 }); // OK
    } catch (error) {
        console.error("Error fetching cart items:", error);

        // Return a generic error response
        return NextResponse.json(
            { error: "An error occurred while fetching the cart items" },
            { status: 500 } // Internal Server Error
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {calculateCommissionsConcurrent} from "@/lib/commission";

// Main POST function
export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, amount } = body;

        // Validate required fields
        if (!userId || !amount) {
            return NextResponse.json(
                { error: "User ID and order amount are required!" },
                { status: 400 }
            );
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: `User with ID ${userId} does not exist.` },
                { status: 404 }
            );
        }

        // Create the order first
        const order = await prisma.order.create({
            data: {
                userId,
                amount,
            },
        });

        // After the order is successfully created, calculate commissions
        const commissionResult = await calculateCommissionsConcurrent(
            userId,
            order.id,
            amount
        );

        // Return success response
        return NextResponse.json(
            {
                message: "Order created successfully!",
                orderId: order.id,
                commissions: commissionResult.message,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error processing order:", error);

        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}

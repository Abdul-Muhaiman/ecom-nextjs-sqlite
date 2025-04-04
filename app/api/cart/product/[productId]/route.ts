import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
    try {
        // Extract productId from params
        const { productId } = await params;
        const reqBody = await req.json();
        const { userId } = reqBody; // Extract userId from the request body

        // Validate userId
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Delete the cart item from the database
        const deletedItem = await prisma.cartItem.deleteMany({
            where: {
                userId: parseInt(userId),
                productId: parseInt(productId),
            },
        });

        if (!deletedItem.count) { // .count ensures Prisma deleted at least one row
            return NextResponse.json({ error: "Failed to delete item from cart" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Item removed from cart successfully",
            productId,
        });
    } catch (error) {
        console.error("Error deleting cart item:", error);

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
    try {
        const { productId } = await params;
        const reqBody = await req.json();
        const { userId, quantity } = reqBody;

        if (!userId || !quantity) {
            return NextResponse.json({ error: "User ID and quantity are required" }, { status: 400 });
        }

        const updatedItem = await prisma.cartItem.updateMany({
            where: {
                userId: parseInt(userId),
                productId: parseInt(productId),
            },
            data: {
                quantity,
            },
        });

        if (!updatedItem.count) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Quantity updated successfully",
            productId,
            quantity,
        });
    } catch (error) {
        console.error("Error updating quantity:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

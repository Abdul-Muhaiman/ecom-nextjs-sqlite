import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const reqBody = await req.json();

        // Validate request body structure
        if (!reqBody || !reqBody.userId || !reqBody.productId || !reqBody.quantity) {
            return NextResponse.json({ error: "Invalid request body or missing fields" }, { status: 400 });
        }

        // Check if the product already exists in the user's cart
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: reqBody.userId,
                productId: reqBody.productId,
            },
        });

        let updatedCartItem;

        if (existingCartItem) {
            // If the product exists, increase the quantity
            updatedCartItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: existingCartItem.quantity + reqBody.quantity, // Increase quantity
                },
            });
        } else {
            // If the product doesn't exist, create a new cart item
            updatedCartItem = await prisma.cartItem.create({
                data: {
                    userId: reqBody.userId,
                    productId: reqBody.productId,
                    productName: reqBody.productName,
                    productPrice: reqBody.productPrice,
                    productImage: reqBody.productImage,
                    quantity: reqBody.quantity,
                },
            });
        }

        return NextResponse.json({
            message: existingCartItem
                ? "Product quantity updated in cart successfully"
                : "Product added to cart successfully",
            product: updatedCartItem,
        });
    } catch (error) {
        console.error("Error processing POST request:", error);

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


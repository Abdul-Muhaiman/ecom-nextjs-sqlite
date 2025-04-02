import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany();

        return NextResponse.json({products}, {status: 200})
    } catch (error) {
        console.error(error)
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { productIds } = body;

    if (!productIds || !Array.isArray(productIds)) {
        return NextResponse.json({ error: "Invalid product IDs" }, { status: 400 });
    }

    // Fetch product details using Prisma for the given product IDs
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });

    return NextResponse.json(products, { status: 200 });
}
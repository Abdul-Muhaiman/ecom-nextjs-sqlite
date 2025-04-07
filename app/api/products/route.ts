import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import { getProducts_DAL } from "@/lib/dal/product";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 9;
    const categoryId = searchParams.get("category") ? parseInt(searchParams.get("category")!, 10) : undefined;

    try {
        const result = await getProducts_DAL({ page, limit, categoryId });
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
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
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const parsedUserId = parseInt(userId, 10);
        if (isNaN(parsedUserId)) {
            return NextResponse.json({ error: 'Invalid User ID. Must be a number.' }, { status: 400 });
        }

        const orders = await prisma.order.findMany({
            where: {userId: parsedUserId},
            select: {
                id: true,
                userId: true,
                amount: true,
                status: true,
                createdAt: true,
                items: {
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                name: true,
                                price: true,
                                image: true,
                            }
                        },
                    }
                }
            }
        })

        if (!orders) {
            return NextResponse.json({ error: 'Orders not found' }, { status: 404 });
        }

        return NextResponse.json(orders, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching orders data:", error);
        return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
    }
}
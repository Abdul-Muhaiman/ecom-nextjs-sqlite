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

        const commissions = await prisma.commission.findMany({
            where: {referrerId: parsedUserId},
            select: {
                id: true,
                orderId: true,
                referrerId: true,
                commissionAmount: true,
                level: true,
                createdAt: true,
                order: {
                    select: {
                        id: true,
                        amount: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        })

        if (!commissions) {
            return NextResponse.json({ error: 'Commissions not found' }, { status: 404 });
        }

        return NextResponse.json(commissions, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching commission data:", error);
        return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
    }
}

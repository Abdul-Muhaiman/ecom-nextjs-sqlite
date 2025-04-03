import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userInfo = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: {
            id: true,
            name: true,
            email: true,
            referralCode: true,
            role: true,
            referredBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    referralCode: true,
                    role: true
                }
            },
            referredUsers: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    referralCode: true,
                    role: true
                }
            }
        }
    });

    if (!userInfo) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userInfo, { status: 200 });
}

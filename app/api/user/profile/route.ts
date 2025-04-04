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

        const userInfo = await prisma.user.findUnique({
            where: { id: parsedUserId },
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
    } catch (error: unknown) {
        console.error("Error fetching user data:", error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: 'Internal server error: ' + error.message },
                { status: 500 }
            );
        }

        // Fallback for unknown error types
        return NextResponse.json(
            { error: 'An unknown error occurred.' },
            { status: 500 }
        );
    }
}

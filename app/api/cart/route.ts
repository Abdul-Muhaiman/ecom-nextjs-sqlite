import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const userId = 1; // Replace with the authenticated user's ID (from NextAuth)
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
    });
    return NextResponse.json(cartItems);
}

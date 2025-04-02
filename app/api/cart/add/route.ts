import prisma from '@/lib/prisma';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, productId, quantity } = await req.json();

    const existingItem = await prisma.cartItem.findFirst({
        where: { userId, productId },
    });

    if (existingItem) {
        const updatedItem = await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
        return NextResponse.json(updatedItem);
    }

    const newItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
    });
    return NextResponse.json(newItem);
}

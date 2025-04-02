import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { id } = await req.json();

    await prisma.cartItem.delete({
        where: { id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

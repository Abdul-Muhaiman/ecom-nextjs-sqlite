import { PrismaClient } from '@prisma/client';

// Use the existing client if it exists, otherwise create a new one
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

export default prisma;

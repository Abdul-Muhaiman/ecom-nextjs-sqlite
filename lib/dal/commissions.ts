// lib/dal/commissions.ts
import { cache } from 'react';
import prisma from '@/lib/prisma';
import { requireAuth, requireAdmin } from './auth';

// Get referral stats for current user
export const getUserReferralStats = cache(async () => {
    const user = await requireAuth();

    const referredUsers = await prisma.user.count({
        where: { referredById: user.id }
    });

    const commissions = await prisma.commission.aggregate({
        where: { referrerId: user.id },
        _sum: { commissionAmount: true },
        _count: true
    });

    return {
        referralCode: user.referralCode,
        referredUsers,
        totalCommissions: commissions._sum.commissionAmount || 0,
        commissionsCount: commissions._count
    };
});

// Get referred users for current user
export const getUserReferrals = cache(async () => {
    const user = await requireAuth();

    return prisma.user.findMany({
        where: { referredById: user.id },
        select: {
            id: true,
            name: true,
            email: true,
            _count: {
                select: { orders: true }
            }
        }
    });
});

// Get commission details for current user
export const getUserCommissions = cache(async () => {
    const user = await requireAuth();

    return prisma.commission.findMany({
        where: { referrerId: user.id },
        include: {
            order: true
        },
        orderBy: { createdAt: 'desc' }
    });
});

// Admin only: Get all commissions
export const getAllCommissions = cache(async () => {
    // Ensure user is admin
    await requireAdmin();

    return prisma.commission.findMany({
        include: {
            referrer: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            order: true
        },
        orderBy: { createdAt: 'desc' }
    });
});
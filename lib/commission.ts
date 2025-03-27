import {Commission} from "@prisma/client";
import prisma from "@/lib/prisma";

type CommissionLevel = {
    level: number;
    commission: number;
};

// Predefined commission percentages for referral levels
const commissionsData: CommissionLevel[] = [
    { level: 1, commission: 0.12 },
    { level: 2, commission: 0.08 },
    { level: 3, commission: 0.06 },
    { level: 4, commission: 0.02 },
];

// Helper function for calculating commissions concurrently
export async function calculateCommissionsConcurrent(
    userId: number,
    orderId: number,
    amount: number
) {
    let idOfUser = userId;
    const commissionPromises: Promise<Commission>[] = []; // Store all commission creation promises

    for (const { level, commission } of commissionsData) {
        const user = await prisma.user.findUnique({
            where: { id: idOfUser },
        });

        if (!user || !user.referredById) {
            // No referrer found, stop processing further levels
            break;
        }

        // Push the commission creation task into the promise array
        commissionPromises.push(
            prisma.commission.create({
                data: {
                    orderId,
                    referrerId: user.referredById,
                    commissionAmount: amount * commission,
                    level,
                },
            })
        );

        // Move up the referral chain
        idOfUser = user.referredById;
    }

    // Execute all commission creation tasks concurrently
    await Promise.all(commissionPromises);

    return {
        success: true,
        message: `Commissions for ${commissionPromises.length} levels created successfully.`,
    };
}
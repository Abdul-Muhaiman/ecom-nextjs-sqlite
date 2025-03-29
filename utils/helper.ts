import prisma from "@/lib/prisma";

export function generateReferralCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export async function generateUniqueReferralCode(): Promise<string> {
    let referralCode = "";
    let isUnique = false;

    while (!isUnique) {
        referralCode = generateReferralCode();
        const existingUser = await prisma.user.findUnique({
            where: { referralCode },
        });
        isUnique = !existingUser;
    }

    return referralCode;
}
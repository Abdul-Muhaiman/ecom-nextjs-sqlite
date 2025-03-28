// utils/user.ts
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateUniqueReferralCode } from "@/utils/utils";

export async function registerUser(
    name: string,
    email: string,
    password: string,
    referralCodeUsed?: string | null
) {
    try {
        // Check for existing email
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "A user with this email already exists." };
        }

        // Check if the referral code used is valid
        let referredById: number | null = null;
        if (referralCodeUsed) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: referralCodeUsed },
            });
            if (!referrer) {
                return { error: "Invalid referral code provided." };
            }
            referredById = referrer.id;
        }

        // Generate a unique referral code
        const referralCode = await generateUniqueReferralCode();

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                referralCode,
                referredById,
            },
        });

        return { message: "User registered successfully!" };
    } catch (error) {
        console.error("Error registering user:", error);
        return { error: "An unexpected error occurred." };
    }
}
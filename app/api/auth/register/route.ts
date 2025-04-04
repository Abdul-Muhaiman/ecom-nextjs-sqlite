import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {generateUniqueReferralCode} from "@/lib/utils/helper";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const referralCodeUsed = formData.get("referralCodeUsed")?.toString();

        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ error: "Name, email, and password are required!" }),
                { status: 400 }
            );
        }

        // Check for existing email
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "A user with this email already exists." }),
                { status: 400 }
            );
        }

        // Check if the referral code used is valid
        let referredById: number | null = null;
        if (referralCodeUsed) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: referralCodeUsed },
            });
            if (!referrer) {
                return new Response(
                    JSON.stringify({ error: "Invalid referral code provided." }),
                    { status: 400 }
                );
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

        NextResponse.json({ message: "User registered successfully!" });

        return new Response(JSON.stringify({ message: "User registered successfully!" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return new Response(
            JSON.stringify({ error: "An unexpected error occurred." }),
            { status: 500 }
        );
    }
}

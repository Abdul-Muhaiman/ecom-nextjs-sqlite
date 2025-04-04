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

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getInitials = (name: string) => {
    const names = name.split(" ");
    let initials = "";
    if (names.length > 0) initials += names[0][0];
    if (names.length > 1) initials += names[names.length - 1][0];
    return initials.toUpperCase();
};

export const navigateToPage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.location.search = params.toString();
}
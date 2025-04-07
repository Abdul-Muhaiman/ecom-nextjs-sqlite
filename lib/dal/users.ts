import "server-only"
import {requireAdmin} from "@/lib/dal/auth";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const getAllUsers_DAL = async () => {
    await requireAdmin();

    // const users: User[] = await prisma.user.findMany({
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            referredById: true,
            referralCode: true,
            referredBy: {
                select: {
                    id: true,
                    name: true,
                    referralCode: true,
                }
            },
            deleted: true,
            deletedAt: true,
        }
    });
}

export const getUserById_DAL = async (id: number) => {
    await requireAdmin();

    return prisma.user.findUnique({
        where: {id: id},
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            referralCode: true,
            referredById: true,
            referredBy: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });
}

export const editUserDetails_DAL = async (editedUser : {id: number, name: string, email: string, role: string}) => {
    await requireAdmin();
    return prisma.user.update({
        where: {id: editedUser.id},
        data: {
            name: editedUser.name,
            email: editedUser.email,
            role: editedUser.role,
        }
    });
}

export const deleteUser_DAL = async (id: number) => {
    // Ensure user has admin privileges
    await requireAdmin();

    // Mark the user as deleted
    const result = await prisma.user.update({
        where: { id },
        data: {
            deleted: true,
            deletedAt: new Date(),
        },
    });

    if (!result) {
        throw new Error(`Failed to mark user with ID ${id} as deleted.`);
    }

    // Delete associated cart items for the user
    await prisma.cartItem.deleteMany({
        where: { userId: id }, // Use the correct association field (e.g., userId)
    });

    revalidatePath("/admin/users");
    return { message: `User with ID ${id} deleted successfully.` };
};

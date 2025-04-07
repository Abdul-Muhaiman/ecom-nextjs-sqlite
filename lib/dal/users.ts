import "server-only"
import {requireAdmin} from "@/lib/dal/auth";
import prisma from "@/lib/prisma";
import {User} from "@/types/user";

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
    await requireAdmin();
    const user : User = await prisma.user.update({
        where: {id: id},
        data: {
            deleted: true,
            deletedAt: new Date(),
        }
    })
    return user;
}
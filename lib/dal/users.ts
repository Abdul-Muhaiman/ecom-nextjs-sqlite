import "server-only"
import {requireAdmin} from "@/lib/dal/auth";
import prisma from "@/lib/prisma";
import {User} from "@/types/user";

export const getAllUsers_DAL = async () => {
    await requireAdmin();

    const users: User[] = await prisma.user.findMany({
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

    return users;
}

export const getUserById_DAL = async (id: number) : Promise<User> => {
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

export const editUserDetails_DAL = async (id : number,  editedData : User) => {
    await requireAdmin();

    const dataBody = {
        name: editedData?.name,
        email: editedData?.email,
        role: editedData?.role,
    }

    const user : User = await prisma.user.update({
        where: {id: id},
        data: dataBody
    })

    return user;
}

export const deleteUser_DAL = async (id: number) => {
    await requireAdmin();

    const user : User = await prisma.user.delete({
        where: {id: id}
    })

    return user;
}
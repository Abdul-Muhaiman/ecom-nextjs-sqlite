"use server"

import {User} from "@/types/user";
import {editUserDetails_DAL, getAllUsers_DAL, getUserById_DAL} from "@/lib/dal/users";

export async function getUsersAction(): Promise<User[]> {
    try {
        return await getAllUsers_DAL();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Unable to fetch users.");
    }
}

export async function getUserByIdAction(id: number) {
    try {
        return await getUserById_DAL(id);
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Unable to fetch user.");
    }
}

export async function editUserDetailsAction(id: number, editedData : User) {
    try {
        return await editUserDetails_DAL(id, editedData);
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Unable to fetch user.");
    }
}
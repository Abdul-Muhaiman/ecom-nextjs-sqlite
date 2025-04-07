"use server"

import {deleteUser_DAL, editUserDetails_DAL, getUserById_DAL} from "@/lib/dal/users";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";


type EditUserState = {
    message: string;
    error: boolean;
}

export async function editUserAction(
    prevState: EditUserState, // 1. Accept previous state as the first argument
    formData: FormData       // 2. Accept FormData as the second argument
): Promise<EditUserState> {   // 3. Return type should match the state type

    if (!(formData instanceof FormData)) {
        console.error("formData received is not an instance of FormData:", formData);
        return { message: "Invalid form data received.", error: true };
    }

    // Extract form data fields
    const id = formData.get("id");
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    // Basic validation
    if (!id || !name || !email || !role) {
        // Return state update instead of throwing error directly in action
        return { message: "All fields (ID, Name, Email, Role) are required.", error: true };
    }

    const userId = parseInt(id as string, 10);
    if (isNaN(userId)) {
        return { message: "Invalid User ID.", error: true };
    }

        // Retrieve the original user data from the database
        const originalUser = await getUserById_DAL(userId);

        if (!originalUser) {
            return { message: `User with ID ${userId} not found.`, error: true };
        }

        // Compare original user data with the new data
        const isDataChanged =
            name !== originalUser.name ||
            email !== originalUser.email ||
            role !== originalUser.role;

        if (!isDataChanged) {
            // Return state update
            return { message: "No changes detected. Please modify one or more fields.", error: true };
        }

        // Construct updated user object
        const updatedUser = {
            id: userId,
            name,
            email,
            role,
        };

        // Call the update function only if changes are detected
        await editUserDetails_DAL(updatedUser);

    // If successful, redirect (outside try-catch ensures it only happens on success)
    redirect(`/admin/users/${userId}`);
}

export async function deleteUserAction(id: number) {
    await deleteUser_DAL(id);
    revalidatePath("/admin/users/");
    return { message: `User with ID ${id} deleted.` };
}
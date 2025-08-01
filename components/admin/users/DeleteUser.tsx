"use client"

import {Trash} from "lucide-react";
import React from "react";
import {deleteUserAction} from "@/lib/actions/admin/users";
import {Toaster, toast} from "sonner";

export default function DeleteUser({userId} : {userId: number}) {
    const handleDelete = async () => {
        const {message} = await deleteUserAction(userId);
        return message;
    }

    return (
        <>
            <Toaster richColors />
            <button onClick={() => handleDelete().then((message)=> toast.success(message))}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition">
                <Trash className="w-5 h-5"/>
                Delete
            </button>
        </>
    );
}

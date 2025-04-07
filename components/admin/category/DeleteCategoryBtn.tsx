"use client"

import {Trash} from "lucide-react";
import React from "react";
import {deleteCategoryAction} from "@/lib/actions/admin/category";

export default function DeleteCategoryBtn({id} : {id: number}) {
    const handleDelete = async () => {
        const {message} = await deleteCategoryAction(id)
        return message;
    }

    return <button
        onClick={handleDelete}
        className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
    >
        <Trash className="w-5 h-5"/>
        Delete
    </button>;
}
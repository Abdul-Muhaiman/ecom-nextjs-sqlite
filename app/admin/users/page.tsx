import React, { Suspense } from "react";
import TableLoadingSkeleton from "@/components/admin/users/TableLoadingSkeletion";
import UserTable from "@/components/admin/users/UsersTable";

export default function UserPage() {
    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>
            <Suspense fallback={<TableLoadingSkeleton />}>
                <UserTable />
            </Suspense>
        </div>
    );
}



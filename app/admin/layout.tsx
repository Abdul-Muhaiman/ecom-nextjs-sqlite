import React from "react";
import Sidebar from "@/components/admin/ui/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 bg-gray-50 p-10">
                {children}
            </main>
        </div>
    );
}

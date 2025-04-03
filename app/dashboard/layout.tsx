import React from "react";
import Sidebar from "@/app/dashboard/components/Sidebar"; // Adjust path if needed

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={"flex"}>
            <Sidebar/>
            <div className={"grow"}>
            {children}
            </div>
        </div>
    );
}
import "@/style/globals.css";
import React from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <SessionProviderWrapper>
            <Navbar />
            {children}
        </SessionProviderWrapper>
        </body>
        </html>


    );
}

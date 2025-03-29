import "@/style/globals.css";
import React from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <SessionProviderWrapper>
            {children}
        </SessionProviderWrapper>
        </body>
        </html>


    );
}

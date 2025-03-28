"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "@/style/globals.css";
import React from "react";
import {SessionProvider} from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SessionProvider>
          <html lang="en">
          <body>
          {children}
          </body>
          </html>
      </SessionProvider>


  );
}

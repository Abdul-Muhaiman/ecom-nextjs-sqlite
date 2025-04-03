// app/checkout/layout.tsx (or similar)
import { AddressProvider } from '@/context/AddressContext';
import React from "react"; // Adjust path if needed

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    // The type for children is implicitly React.ReactNode, but being explicit is fine too.
    return (
        <AddressProvider>
            {children}
        </AddressProvider>
    );
}
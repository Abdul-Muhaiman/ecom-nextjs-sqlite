// app/checkout/layout.tsx (or similar)
import { AddressProvider } from '@/context/AddressContext';
import React from "react"; // Adjust path if needed

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    // The type for children is implicitly React.ReactNode, but being explicit is fine too.
    return (
        <AddressProvider>
            <h1>Checkout</h1>
            {children}
        </AddressProvider>
    );
}
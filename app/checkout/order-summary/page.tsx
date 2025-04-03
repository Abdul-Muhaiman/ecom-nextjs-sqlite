// components/OrderSummary.tsx
"use client"; // Still needed

import React from 'react';
import { useAddress } from '@/context/AddressContext'; // Adjust path

export function OrderSummary() {
    // shippingAddress is now strongly typed as Address
    const { shippingAddress } = useAddress();

    return (
        <div>
            <h3>Order Summary</h3>
            <h4>Shipping To:</h4>
            {/* Accessing properties benefits from autocomplete and type checking */}
            {shippingAddress.street || shippingAddress.city ? (
                <p>
                    {shippingAddress.street}
                    <br />
                    {shippingAddress.city}
                    {/* Display other fields */}
                </p>
            ) : (
                <p>Address not entered yet.</p>
            )}
            {/* Display items, total, etc. */}
        </div>
    );
}
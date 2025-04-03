// components/AddressForm.tsx
"use client"; // Still needed

import React from 'react';
import { useAddress } from '@/context/AddressContext';
import {OrderSummary} from "@/app/checkout/order-summary/page"; // Adjust path

export default function AddressForm() {
    // Destructuring now benefits from types defined in useAddress/AddressContextType
    const { shippingAddress, setShippingAddress } = useAddress();

    // Add the correct event type for input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress(prevAddress => ({
            ...prevAddress,
            [name]: value, // TypeScript understands 'name' can be keys of Address here
        }));
    };

    return (
        <>
            <form>
                <h3>Shipping Address</h3>
                <label>
                    Street:
                    <input
                        name="street" // Matches key in Address interface
                        value={shippingAddress.street}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    City:
                    <input
                        name="city" // Matches key in Address interface
                        value={shippingAddress.city}
                        onChange={handleChange}
                    />
                </label>
                {/* Add more typed input fields */}
            </form>
            <OrderSummary />
        </>
    );
}
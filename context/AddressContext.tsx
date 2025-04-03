// context/AddressContext.tsx (Note the .tsx extension)
"use client"; // Still needed for client-side state and hooks

import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';

// 1. Define the structure of our address data
export interface Address {
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    // Add more fields as needed (zip, country, etc.) with their types (e.g., zip: string;)
}

// 2. Define the shape of the data our context will provide
interface AddressContextType {
    shippingAddress: Address;
    setShippingAddress: Dispatch<SetStateAction<Address>>; // Type for the useState setter
}

// 3. Create the 'whiteboard' (Context) with its type
// Initialize with 'undefined' because it has no value until the Provider wraps it.
const AddressContext = createContext<AddressContextType | undefined>(undefined);

// 4. Define props for our Provider component
interface AddressProviderProps {
    children: ReactNode; // Standard type for component children
}

const SESSION_STORAGE_KEY = "addressSession";

// 5. Create the 'room' (Provider Component) with TypeScript
export function AddressProvider({ children }: AddressProviderProps) {
    const [shippingAddress, setShippingAddress] = useState<Address>(() => {
        // ... (your existing loading logic is correct here) ...
        try {
            const savedAddress = sessionStorage.getItem(SESSION_STORAGE_KEY);
            return savedAddress
                ? (JSON.parse(savedAddress) as Address)
                : { fullName: '', street: '', city: '', state: '', country: '', zip: '' };
        } catch (error) {
            console.error(`Error reading ${SESSION_STORAGE_KEY} from sessionStorage:`, error);
            return { fullName: '', street: '', city: '', state: '', country: '', zip: '' };
        }
    });

    // --- ADD THIS useEffect ---
    useEffect(() => {
        try {
            // Save the current shippingAddress state to sessionStorage whenever it changes
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shippingAddress));
        } catch (error) {
            console.error(`Error saving ${SESSION_STORAGE_KEY} to sessionStorage:`, error);
        }
        // This effect runs when shippingAddress changes
    }, [shippingAddress]);
    // --- END of added useEffect ---


    const value: AddressContextType = {
        shippingAddress,
        setShippingAddress,
    };

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
}

// 6. Create an easy way for components to use the context (typed hook)
export function useAddress(): AddressContextType {
    const context = useContext(AddressContext);
    if (context === undefined) {
        // This check ensures components are used within the Provider
        throw new Error('useAddress must be used within an AddressProvider');
    }
    // We know the context is not undefined here, so we return it.
    return context;
}
// context/AddressContext.tsx (Note the .tsx extension)
"use client"; // Still needed for client-side state and hooks

import React, {
    useState,
    createContext,
    useContext,
    ReactNode, // Type for children props
    Dispatch,  // Type for state setters
    SetStateAction // Type for state setters
} from 'react';

// 1. Define the structure of our address data
interface Address {
    street: string;
    city: string;
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

// 5. Create the 'room' (Provider Component) with TypeScript
export function AddressProvider({ children }: AddressProviderProps) {
    // Initialize state with the Address type and default values
    const [shippingAddress, setShippingAddress] = useState<Address>({
        street: '',
        city: '',
    });

    // The 'value' object must match the AddressContextType interface
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
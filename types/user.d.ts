export interface User {
    id: number;
    name: string;
    email: string;
    password?: string; // Marked optional as you likely don't need it in the UI
    referralCode: string;
    referredById: number | null; // ID of the referrer, can be null
    role: string; // e.g., "user", "admin"
    referredBy?: ReferredBy; // Optional, nested referrer object
    referredUsers?: ReferredUser[]; // Optional, array of referred users
}

// Interface for the 'referredBy' nested object
export interface ReferredBy {
    id: number;
    name: string;
    email: string;
    password?: string; // Marked optional, sensitive data not required
    referralCode: string;
    referredById: number | null; // Can refer to another user
    role: string; // e.g., "user", "admin"
}

// Interface for the 'referredUsers' array
export interface ReferredUser {
    id: number;
    name: string;
    email: string;
    password?: string; // Marked optional, sensitive data not required
    referralCode: string;
    referredById: number | null; // ID of the referrer, can be null
    role: string; // e.g., "user", "admin"
}

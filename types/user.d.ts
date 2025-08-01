export interface ReferredBy {
    id: number;
    name: string;
    email: string;
    referralCode: string;
}

// Interface for the 'referredUsers' array
export interface ReferredUser {
    id: number;
    name: string;
    email: string;
    referralCode: string;
}

// Main User Interface
export interface UserOld {
    id: number;
    name: string;
    email: string;
    referralCode: string;
    referredById: number | null;
    role: string;
    referredBy?: ReferredBy;
    referredUsers?: ReferredUser[];
}

export type User = {
    id: number
    name: string
    email: string
    referralCode?: string
    role: string
    referredById?: number | null | undefined;
    referredBy?: {
        id: number | null | undefined
        name: string | null | undefined
    } | null | undefined;
} | null

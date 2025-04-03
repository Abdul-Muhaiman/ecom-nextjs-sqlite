'use client';

import React, { createContext, useContext } from "react";


interface Session {
    user: User;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export const SessionContext = createContext<Session | null>(null);

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionContext must be used within a SessionProvider");
    }
    return context;
};

export function SessionProvider({ children, session }: { children: React.ReactNode; session: Session }) {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}

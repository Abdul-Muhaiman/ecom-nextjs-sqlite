'use client';

import { useEffect, useState } from 'react';
import { useSessionContext } from "@/context/SessionContext";
import {Commission} from "@/types/commission";
import CommissionDetails from "@/app/dashboard/components/CommissionDetails";

export default function CommissionPage() {
    const session = useSessionContext(); // Get session from your custom context
    const [commissions, setCommission] = useState<Commission[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCommissionDetails = async () => {
            if (session?.user?.id) {
                setIsLoading(true); // Start loading
                try {
                    const response = await fetch(`/api/user/referral?userId=${session.user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const data: Commission[] = await response.json();
                    setCommission(data); // Set the data into state
                } catch (error) {
                    console.error("Error fetching user details:", error);
                } finally {
                    setIsLoading(false); // Stop loading
                }
            }
        };

        fetchCommissionDetails();
    }, [session]);

    // Handle loading state
    if (isLoading) {
        return <div className="text-center mt-16">Loading commissions information...</div>;
    }

    // Handle unauthenticated state
    if (!session?.user) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">You must be logged in to view your commissions.</p>
            </div>
        );
    }

    // Handle no commission data loaded
    if (!commissions) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">Commissions information could not be loaded.</p>
            </div>
        );
    }

    // Render commission data
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <CommissionDetails commissions={commissions} />
        </div>
    );
}

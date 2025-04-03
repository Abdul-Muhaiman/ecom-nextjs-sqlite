'use client';

import { useEffect, useState } from 'react';
import UserProfile from './components/UserProfile';
import { useSession } from "next-auth/react";
import {User} from "@/types/user";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (session?.user?.id) {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/user/profile?userId=${session.user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const data: User = await response.json();
                    console.log(data);
                    setUser(data);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchUserDetails();
    }, [session]);

    // Render loading states and error messages
    if (status === 'loading' || isLoading) {
        return <div className="text-center mt-16">Loading user information...</div>;
    }

    if (status === 'unauthenticated') {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">You must be logged in to view your profile.</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">User information could not be loaded.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <UserProfile user={user} />
        </div>
    );
}

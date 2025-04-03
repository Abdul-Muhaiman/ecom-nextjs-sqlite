'use client';

import { useEffect, useState } from 'react';
import UserProfile from './components/UserProfile';
import { useSessionContext } from "@/context/SessionContext"; // Your custom context for session
import { User } from "@/types/user";

export default function ProfilePage() {
    const session = useSessionContext(); // Replace useSession with useSessionContext
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log("SESSION", session.user.id)

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (session?.user?.id) {
                setIsLoading(true); // Start loading
                try {
                    const response = await fetch(`/api/user/profile?userId=${session.user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const data: User = await response.json();
                    console.log(data);
                    setUser(data); // Set user state
                } catch (error) {
                    console.error("Error fetching user details:", error);
                } finally {
                    setIsLoading(false); // Stop loading
                }
            }
        };

        fetchUserDetails();
    }, [session]);

    // Handle loading state
    if (isLoading) {
        return <div className="text-center mt-16">Loading user information...</div>;
    }

    // Handle unauthenticated state
    if (!session?.user) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">You must be logged in to view your profile.</p>
            </div>
        );
    }

    // Handle no user data loaded
    if (!user) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">User information could not be loaded.</p>
            </div>
        );
    }

    // Render profile page with user data
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <UserProfile user={user} />
        </div>
    );
}

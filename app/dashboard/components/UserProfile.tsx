import React from 'react';
import Link from "next/link";

// Interface for the 'referredBy' nested object
interface ReferredBy {
    id: number;
    name: string;
    email: string;
    referralCode: string;
}

// Interface for the 'referredUsers' array
interface ReferredUser {
    id: number;
    name: string;
    email: string;
    referralCode: string;
}

// Main User Interface
interface User {
    id: number;
    name: string;
    email: string;
    referralCode: string;
    referredById: number | null;
    role: string;
    referredBy?: ReferredBy;
    referredUsers?: ReferredUser[];
}

const UserProfile = ({user}: { user: User }) => {
    // Helper function to get initials for avatar
    const getInitials = (name: string) => {
        const names = name.split(' ');
        let initials = '';
        if (names.length > 0) {
            initials += names[0][0];
        }
        if (names.length > 1) {
            initials += names[names.length - 1][0];
        }
        return initials.toUpperCase();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            <div className="text-center">
                <div
                    className="h-20 w-20 mx-auto bg-blue-200 rounded-full flex items-center justify-center text-3xl font-bold text-blue-800 mb-4">
                    {getInitials(user.name)}
                </div>
                <h1 className="text-3xl font-semibold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <Link href={'/dashboard/referral'}>
                    <button
                        className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                        View Commissions
                    </button>
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Referral Code</h2>
                <div className="p-4 bg-gray-100 rounded-md font-mono text-xl font-semibold text-blue-600 text-center">
                    {user.referralCode}
                </div>
            </div>

            {user.referredBy && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Referred By</h2>
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                            {getInitials(user.referredBy.name)}
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-900">{user.referredBy.name}</p>
                            <p className="text-gray-600">{user.referredBy.email}</p>
                        </div>
                    </div>
                    <div
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                        Referral Code: {user.referredBy.referralCode}
                    </div>
                </div>
            )}

            {user.referredUsers && user.referredUsers.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Users You&#39;ve Referred
                        ({user.referredUsers.length})</h2>
                    <div className="space-y-4">
                        {user.referredUsers.map((referredUser) => (
                            <div key={referredUser.id}
                                 className="p-4 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                                        {getInitials(referredUser.name)}
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{referredUser.name}</p>
                                        <p className="text-gray-600">{referredUser.email}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    Referral Code: {referredUser.referralCode}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;

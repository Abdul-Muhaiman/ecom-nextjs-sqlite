// lib/dal/auth.ts
import 'server-only';
import { cache } from 'react';
import { getServerSession } from 'next-auth';
import prisma  from '@/lib/prisma';
import { redirect } from 'next/navigation';
import {authOptions} from "@/lib/auth";
import {User} from "@/types/user";

// Get the current user session
export const getServerUser = cache(async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    // Fetch the complete user data from database
    const user : User = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            referralCode: true
        }
    });

    return user;
});

// Require authentication (any role)
export const requireAuth = cache(async () => {
    const user : User = await getServerUser();

    if (!user) {
        redirect('/login');
    }

    return user;
});

// Require admin role
export const requireAdmin = cache(async () => {
    const user : User = await requireAuth();

    if (user.role !== 'admin') {
        // Either redirect or throw an error
        redirect('/dashboard'); // Redirect to user dashboard
        // OR throw new Error('Unauthorized: Admin access required');
    }

    return user;
});

// Check if user has specific permissions
export const hasPermission = cache(async (permission: string) => {
    const user = await getServerUser();
    if (!user) return false;

    // Simple role-based check
    if (permission === 'manage_products' && user.role === 'admin') return true;
    return permission === 'view_orders' && (user.role === 'admin' || user.role === 'user');

});
// middleware.ts
import {NextRequest, NextResponse} from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected paths
const adminPaths = ['/admin', '/admin/products', '/admin/orders', '/admin/users'];
const userPaths = ['/dashboard', '/orders', '/profile', '/cart', '/checkout'];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if path requires authentication
    const isAdminPath = adminPaths.some(p => path.startsWith(p));
    const isUserPath = userPaths.some(p => path.startsWith(p));

    if (!isAdminPath && !isUserPath) {
        return NextResponse.next();
    }

    const token = await getToken({ req: request });

    // Not logged in
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin paths require admin role
    if (isAdminPath && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}
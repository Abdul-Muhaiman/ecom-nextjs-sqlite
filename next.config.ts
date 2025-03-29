import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '', // Leave empty if no specific port is required
                pathname: '/img/**', // Matches all paths under /img/
            },
        ],
    },
}

export default nextConfig;

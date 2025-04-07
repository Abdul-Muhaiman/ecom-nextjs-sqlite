import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // Allow HTTP
                hostname: '**', // Allow any hostname
            },
            {
                protocol: 'https', // Allow HTTPS
                hostname: '**', // Allow any hostname
            }
        ],
    },
};

export default nextConfig;
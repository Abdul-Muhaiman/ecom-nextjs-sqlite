import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                // https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png
                protocol: "https",
                hostname: "cdn.dummyjson.com",
                port: "",
                pathname: "/products/**",
                search:"",
            }
        ]
    }
};

export default nextConfig;

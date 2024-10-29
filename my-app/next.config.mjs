/** @type {import('next').NextConfig} */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'blogging-site-utb8.onrender.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'blogging-site-utb8.onrender.com',
                port: "",
                pathname: '/**',
            },
            {
                hostname : 'localhost',
            }
        ],
    },
    env: {
        // REQUEST_URL: "https://blogging-site-utb8.onrender.com",
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['blogging-site-utb8.onrender.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'blogging-site-utb8.onrender.com/',
                port: "",
            },
        ]
    },
    env: {
        REQUEST_URL: "https://blogging-site-utb8.onrender.com/",
    },

};

export default nextConfig;

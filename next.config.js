/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_BASE: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080/api' : 'https://svwefsbr-game-website.fly.dev/'
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig;

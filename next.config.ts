import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        root: path.resolve(__dirname),
    },
    outputFileTracingIncludes: {
        '/api/chat': ['./docs/DRS_DEALS_MASTER_CONTEXT.md'],
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    generateBuildId: async () => {
        return `drs-deals-${Date.now()}`;
    },
    async redirects() {
        return [
            {
                source: '/explore',
                destination: '/deals',
                permanent: true,
            },
            {
                source: '/experiences/hotel-resorts',
                destination: '/category/hotel-resorts',
                permanent: true,
            },
            {
                source: '/experiences/resorts',
                destination: '/category/hotel-resorts',
                permanent: true,
            },
            {
                source: '/experiences/restaurants-bars',
                destination: '/category/restaurants-bars',
                permanent: true,
            },
            {
                source: '/experiences/dining',
                destination: '/category/restaurants-bars',
                permanent: true,
            },
            {
                source: '/experiences/theme-parks',
                destination: '/category/theme-parks',
                permanent: true,
            },
            {
                source: '/experiences/farmhouses',
                destination: '/category/theme-parks',
                permanent: true,
            },
            {
                source: '/experiences/water-parks',
                destination: '/category/waterparks',
                permanent: true,
            },
            {
                source: '/experiences/waterparks',
                destination: '/category/waterparks',
                permanent: true,
            },
            {
                source: '/experiences/spa',
                destination: '/category/spa',
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            // High-bandwidth video assets (immutable long-term browser cache)
            {
                source: '/videos/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Static images and brand logos (daily freshness with background stale revalidation)
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                source: '/corporateclients/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                source: '/logo-drs-deals.webp',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                source: '/section-showcase/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                source: '/llms.txt',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/plain; charset=utf-8',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            // Ensure HTML pages and documents revalidate so returning users get the newest deployment
            {
                source: '/((?!api|_next/static|_next/image|favicon.ico|icon.png|videos|corporateclients|images|section-showcase).*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
        minimumCacheTTL: 604800,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    output: 'export',
    trailingSlash: true,
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

export default nextConfig;

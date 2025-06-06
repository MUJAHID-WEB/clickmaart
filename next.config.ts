import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['bn', 'en'],
    defaultLocale: 'bn',
    localeDetection: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },

  serverExternalPackages: ['next-i18next'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
    domains: ['example.com'], 
  },
  // images: {
  //   domains: ['example.com'], 
  // },

  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
      // Fallback for admin 404
      {
        source: '/admin/_error',
        destination: '/admin/404',
      },
    ]
  },
  
};

export default nextConfig;
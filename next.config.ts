import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
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
    domains: ['example.com'],
  },
};

export default nextConfig;
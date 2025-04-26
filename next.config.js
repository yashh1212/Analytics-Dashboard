/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // Disable webpack cache to resolve file system errors
    config.cache = false;

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        https: false,
        http: false,
        path: false,
        os: false,
        stream: false,
      };
    }
    return config;
  },
};

module.exports = {
  env: {
    NEXT_PUBLIC_WS_URL:
      process.env.NEXT_PUBLIC_WS_URL || "wss://nextjs.org/",
  },
};

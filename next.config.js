/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure Node.js built-in modules are not bundled in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        http: false,
        https: false,
        buffer: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

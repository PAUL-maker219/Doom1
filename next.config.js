/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Provide fallbacks for Node.js built-in modules in the client-side bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
        fs: false,
        https: false,
        http: false,
        net: false,
      };
    }

    // Ensure the 'buffer' module is included in the client bundle
    if (!isServer) {
      config.plugins.push(
        new (require('webpack')).ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;

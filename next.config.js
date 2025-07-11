/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Ensure Node.js built-in modules are not bundled in client-side code
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: false,
        fs: false,
        http: false,
        https: false,
        net: false,
        tls: false,
        child_process: false,
        os: false,
        path: false,
      };
    } else {
      // For server-side, ensure Node.js modules are available
      config.externals = config.externals || [];
      config.externals.push({
        buffer: 'commonjs buffer',
        fs: 'commonjs fs',
        http: 'commonjs http',
        https: 'commonjs https',
        net: 'commonjs net',
      });
    }

    // Ensure node-fetch is treated as an external module in server-side builds
    config.externals = config.externals || [];
    config.externals.push('node-fetch');

    return config;
  },
  // Ensure API routes are not prerendered or bundled for client-side
  experimental: {
    serverComponentsExternalPackages: ['node-fetch'],
  },
};

module.exports = nextConfig;

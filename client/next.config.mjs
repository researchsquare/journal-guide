/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    // Add SVGR for SVGs
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Aliases
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': '.',
      '@/components': './components',
      '@/lib': './lib',
      '@/utils': './utils',
    };

    return config;
  },
};

export default nextConfig;

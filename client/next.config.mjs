/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, {isServer}) => {
    // Add SVGR for SVGs
    console.log("✅ Custom Webpack config is running!", { isServer });
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

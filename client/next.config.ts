import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
    typescript: {
    tsconfigPath: isProd ? 'tsconfig.build.json' : 'tsconfig.json',
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  sassOptions: {
    implementation: 'sass-embedded',
  },
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

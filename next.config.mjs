/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/alpha-beta-visualization' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/alpha-beta-viz' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/alpha-beta-viz' : '',
    images: {
      unoptimized: true,
    },
};

export default nextConfig;

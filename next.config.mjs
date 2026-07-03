/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'business.ziarra.world',
        pathname: '/api/uploads/**',
      },
    ],
  },
};

export default nextConfig;

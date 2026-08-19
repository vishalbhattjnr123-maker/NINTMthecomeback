/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.EXPORT_STATIC === 'true' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

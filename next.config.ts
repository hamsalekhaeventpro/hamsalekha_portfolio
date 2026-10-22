/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 828, 1080, 1440, 1920],
    imageSizes: [96, 160, 256, 384],
    remotePatterns: [],
    // Permit local image paths under /images/ with asset-versioning query strings (?v=<hash>)
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;

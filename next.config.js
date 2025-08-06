// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ disables image optimization (required for static export)
  },
};

module.exports = nextConfig;

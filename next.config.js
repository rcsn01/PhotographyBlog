// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ disables image optimization (required for static export)
  },
  output: 'export', // Optional: explicitly enables static export mode
};

module.exports = nextConfig;

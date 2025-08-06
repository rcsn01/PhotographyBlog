/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static export
  // Uncomment and replace 'repo-name' if deploying to GitHub Pages subpath:
  // basePath: '/repo-name',
  // Uncomment if you're using images:
  // images: {
  //   unoptimized: true, // Required for static export
  // },
}

module.exports = nextConfig
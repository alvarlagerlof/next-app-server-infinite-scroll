/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    scrollRestoration: true,
    runtime: "experimental-edge",
  },
};

module.exports = nextConfig;

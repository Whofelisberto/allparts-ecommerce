/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: "./",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

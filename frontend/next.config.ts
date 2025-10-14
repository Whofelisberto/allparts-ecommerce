import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: "./",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

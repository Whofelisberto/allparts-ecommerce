import type { NextConfig } from "next";

const nextConfig: NextConfig = {
outputFileTracingRoot: "./",
};
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;

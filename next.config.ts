import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable Strict Mode
  eslint: {
    ignoreDuringBuilds: true,   
  },
};

export default nextConfig;

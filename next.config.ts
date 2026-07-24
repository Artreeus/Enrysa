import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "https://preview-chat-84c57db6-96a8-42b8-913e-3886e58adc56.space-z.ai",
    "https://*.space-z.ai",
  ],
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
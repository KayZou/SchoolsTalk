import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remove "domains" entirely
    remotePatterns: [
      {
        protocol: "https", // or 'http' if needed
        hostname: "img.clerk.com", // no trailing slash
        port: "", // leave blank unless a custom port
        // Only include the paths you actually need; '/**' allows all
        pathname: "/**",
      },
    ],
  },
  typescript: {
    // WARNING: You’re opting into deploying code that may have runtime type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // (Optional) also skip ESLint failures
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

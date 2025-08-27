import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ don't fail the build on TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ don't fail the build on ESLint errors
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // covers your Supabase project images
      },
    ],
  },
};

export default nextConfig;

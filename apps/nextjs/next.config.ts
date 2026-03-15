import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@repo/ui"],
  turbopack: {
    root: "../../",
  },
  experimental: {},
}

export default nextConfig

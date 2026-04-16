import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.stackwerkhaus.de",
        pathname: "/sites/default/files/**",
      },
    ],
  },
};

export default nextConfig;

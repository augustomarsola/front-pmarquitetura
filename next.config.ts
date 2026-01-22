import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "pmarquitetura.local",
        port: "",
        pathname: "/**",
      },
    ],
    // Permite IPs privados em desenvolvimento
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;

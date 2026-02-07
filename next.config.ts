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
      {
        protocol: "http",
        hostname: "pmarquitetura.com.br",
        port: "",
        pathname: "/cms/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "pmarquitetura.com.br",
        port: "",
        pathname: "/cms/wp-content/uploads/**",
      },
    ],
    // Permite IPs privados em desenvolvimento
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;

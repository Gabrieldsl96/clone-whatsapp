import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,

  webpack: (config) => {
    return config;
  },

  transpilePackages: [
    "@mui/material",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
    "@emotion/use-insertion-effect-with-fallbacks",
  ],
};

export default nextConfig;

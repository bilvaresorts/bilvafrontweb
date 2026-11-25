import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Villas and Invest are one page each. Their old sub-pages lead to the matching part of that page.
  async redirects() {
    return [
      { source: "/villas/model-villa", destination: "/villas#rooms", permanent: true },
      { source: "/villas/personalise", destination: "/villas#naming", permanent: true },
      { source: "/investment/rental-income", destination: "/investment#rental", permanent: true },
      { source: "/investment/calculator", destination: "/investment#calculator", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

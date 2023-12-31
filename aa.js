/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  target: "static",
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/qrscanner/anytoken": {
        page: "/qrscanner/[slug]",
        query: { slug: "anytoken" }
      },
    }
  },
  images: {
    domains: ["*"],
    loader: "akamai",
    path: "",
    unoptimized: true,
  },
  NETLIFY_NEXT_PLUGIN_SKIP: true,
  assetPrefix: "",
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

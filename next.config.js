const nextConfig = {
  output: "export",
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
  assetPrefix: "",
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

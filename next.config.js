const nextConfig = {
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
    loader: "default",
  },
  assetPrefix: "",
  compiler: {
    styledComponents: true,
  },
  target: "serverless",
};

module.exports = nextConfig;

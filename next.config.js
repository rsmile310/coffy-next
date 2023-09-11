const nextConfig = {
  output: "export",
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      ...defaultPathMap,
      '/qrscanner/anytoken': { page: '/qrscanner/[scannerToken]', query: { scannerToken: 'anytoken' } },
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

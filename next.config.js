/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? 'https://cozy-gingersnap-d3694b.netlify.app' : 'localhost:3000',
  output: "export",
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

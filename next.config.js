const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const repo = "my-portfolio"; // <-- IMPORTANT: your repo name

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: { unoptimized: true },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          dest: "public",
          runtimeCaching,
        },
      },
    ],
  ],
  nextConfig
);

/** @type {import('next').NextConfig} */
require("dotenv").config();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    FILE_UPLOAD_SERVER_URL: process.env.FILE_UPLOAD_SERVER_URL,
    FILE_TEMP_URL: process.env.FILE_TEMP_URL,
    FILE_URL: process.env.FILE_URL,
  },
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com",],
  },
});

module.exports = nextConfig;

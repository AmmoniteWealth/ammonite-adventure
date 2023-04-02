/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  env: {
    X_HASURA_ADMIN_SECRET: process.env.X_HASURA_ADMIN_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

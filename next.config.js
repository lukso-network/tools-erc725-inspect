/** @type {import('next').NextConfig} */

const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      worker_threads: false,
    };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );

    return config;
  },
  env: {
    SHARED_KEY: process.env.SHARED_KEY,
  },
};

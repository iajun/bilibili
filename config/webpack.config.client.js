const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.config.base');
const generateStyleLoaders = require('./utils/generateStyleLoaders');
const generateScriptLoaders = require('./utils/generateScriptLoaders');

const isProd = process.env.NODE_ENV === 'production';

const clientConfig = merge(baseWebpackConfig, {
  entry: {
    app: ['./src/entry-client.tsx'],
  },
  output: {
    filename: 'static/js/[name].[hash:8].js',
  },
  devtool: isProd ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      ...generateScriptLoaders({
        target: 'web',
      }),
      ...generateStyleLoaders({
        extract: isProd,
        postcss: true,
      }),
    ],
  },
  plugins: [
    new LoadablePlugin({
      filename: 'client-manifest.json',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: function(module) {
            if (module.resource && /\.(scss|css)$/.test(module.resource)) {
              return false;
            }
            return module.context && module.context.includes('node_modules');
          },
        },
      },
    },
  },
});

if (isProd) {
  clientConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
  );
}

module.exports = clientConfig;

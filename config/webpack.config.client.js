const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const WebpackBar = require('webpackbar');

const baseWebpackConfig = require('./webpack.config.base');
const generateScriptLoaders = require('./utils/generateScriptLoaders');

const isProd = process.env.NODE_ENV === 'production';

const clientConfig = merge(baseWebpackConfig, {
  name: 'client',
  entry: {
    app: ['./src/entry-client.tsx'],
  },
  output: {
    filename: isProd ? 'static/js/[name].[chunkhash].js' : 'static/js/[name].[hash].js',
  },
  devtool: isProd ? 'none' : '#cheap-module-eval-source-map',
  module: {
    rules: [
      ...generateScriptLoaders({
        target: 'web',
      }),
    ],
  },
  plugins: [
    new LoadablePlugin({
      filename: 'client-manifest.json',
    }),
    new WebpackBar({
      name: 'client',
      color: '#FDBF0A',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
});

module.exports = clientConfig;

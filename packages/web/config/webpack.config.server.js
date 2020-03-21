const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { baseConfig, resolveFromRoot } = require('./webpack.config.base');
const generateStyleLoaders = require('./utils/generateStyleLoaders');
const generateScriptLoaders = require('./utils/generateScriptLoaders');

module.exports = merge(baseConfig, {
  name: 'server',
  target: 'node',
  entry: {
    serverbundle: [resolveFromRoot('src/entry-server.tsx')],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals({
      whitelist: [/@babel\/runtime/],
    }),
    '@loadable/component',
  ],
  module: {
    rules: [
      ...generateScriptLoaders({
        target: 'node',
      }),
      // we can't use style-loader for ssr, cuz this is no document object, thus extract css
      ...generateStyleLoaders({
        extract: true,
        postcss: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
  ],
});

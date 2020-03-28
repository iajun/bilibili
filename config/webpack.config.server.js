const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const WebpackBar = require('webpackbar');

const baseWebpackConfig = require('./webpack.config.base');
const generateScriptLoaders = require('./utils/generateScriptLoaders');

module.exports = merge(baseWebpackConfig, {
  name: 'server',
  target: 'node',
  entry: {
    serverbundle: ['./src/entry-server.tsx'],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals(), '@loadable/component'],
  module: {
    rules: [
      ...generateScriptLoaders({
        target: 'node',
      }),
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'server',
      color: '#E71D62',
    }),
  ],
});

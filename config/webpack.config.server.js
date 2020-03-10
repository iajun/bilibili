const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.config.base');
const getStyleLoaders = require('./utils/getStyleLoaders');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  entry: {
    app: ['./src/entry-server.tsx'],
  },
  output: {
    filename: 'serverbundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals(), '@loadable/component'],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: {
                target: 'node',
              },
            },
          },
          'awesome-typescript-loader',
          'eslint-loader',
        ],
        exclude: /node_modules/,
      },
      ...getStyleLoaders({
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

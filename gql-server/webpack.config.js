/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Date: 2020-03-19 21:18:11
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-20 10:23:04
 */
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  devtool: '#@cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  entry: {
    'gql-server': ['./src/index.ts'],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.(gql|graphql)$/,
        use: ['graphql-tag/loader', 'minify-graphql-loader'],
      },
    ],
  },
};

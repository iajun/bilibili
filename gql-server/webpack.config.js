/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Date: 2020-03-19 21:18:11
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 21:22:51
 */
const nodeExternals = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  target: 'node',
  devtool: '#@cheap-module-source-map',
  entry: {
    'gql-server': ['./index.ts'],
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
    ],
  },
};

const webpack = require('webpack');
// speed up bundling process using cache
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// inject absolute paths from tsconfig.json
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// ts type check in a seperate process
const { CheckerPlugin } = require('awesome-typescript-loader');

const resolve = relativePath =>
  require('path').resolve(__dirname, relativePath);

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '#inline-source-map' : '#source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: resolve('../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: 'static/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({}),
    new HardSourceWebpackPlugin(),
  ],
};

module.exports = baseConfig;

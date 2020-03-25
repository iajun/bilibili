const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateStyleLoaders = require('./utils/generateStyleLoaders');
const { CheckerPlugin } = require('awesome-typescript-loader');
const SpritePlugin = require('svg-sprite-loader/plugin');

const resolve = (relativePath) =>
  require('path').resolve(__dirname, relativePath);

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        mainFields: ['index'],
      }),
    ],
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      ...generateStyleLoaders({
        extract: isProd
          ? false
          : {
              hmr: true,
            },
        postcss: true,
      }),
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: 'static/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'static/img/sprite.svg',
              publicPath: '/',
            },
          },
        ],
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
    new HardSourceWebpackPlugin({
      info: {
        mode: 'none',
        level: 'error',
      },
    }),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        test: /mini-css-extract-plugin/,
      },
      {
        test: /svg-sprite-loader/,
      },
    ]),
    new MiniCssExtractPlugin({
      filename: isProd
        ? 'static/css/[name].[contenthash].css'
        : 'static/css/[name].css',
    }),
    new SpritePlugin(),
  ],
};

module.exports = baseConfig;

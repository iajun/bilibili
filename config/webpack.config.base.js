const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const SpritePlugin = require('svg-sprite-loader/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const resolve = relativePath =>
  require('path').resolve(__dirname, relativePath);

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  mode: isProd ? 'production' : 'development',
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
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: 'static/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.svg$/,
        include: resolve('../src/assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: 'static/img/',
            },
          },
          'svgo-loader',
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
    new SpritePlugin(),
    new ProgressBarPlugin(),
  ],
};

module.exports = baseConfig;
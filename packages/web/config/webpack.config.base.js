const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const SpritePlugin = require('svg-sprite-loader/plugin');

const resolveFromRoot = (...relativePath) =>
  require('path').resolve(__dirname, '..', ...relativePath);

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  name: 'base',
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolveFromRoot('tsconfig.json'),
        mainFields: ['index'],
      }),
    ],
  },
  output: {
    path: resolveFromRoot('dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        exclude: resolve('../src/assets/icons'),
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
              publicPath: '/static/',
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
    new HardSourceWebpackPlugin(),
    new SpritePlugin(),
  ],
};

module.exports = { baseConfig, resolveFromRoot };

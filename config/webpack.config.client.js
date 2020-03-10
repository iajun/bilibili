const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.config.base');
const getStyleLoaders = require('./utils/getStyleLoaders');

const isProd = process.env.NODE_ENV === 'production';

const clientConfig = merge(baseWebpackConfig, {
  entry: {
    app: ['./src/entry-client.tsx'],
  },
  output: {
    filename: 'static/js/[name].[hash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: {
                target: 'web',
              },
            },
          },
          'awesome-typescript-loader',
          'eslint-loader',
        ],
        exclude: /node_modules/,
      },
      // we can't use style-loader for ssr, cuz this is no document object, thus extract css
      ...getStyleLoaders({
        extract: isProd,
        postcss: true,
      }),
    ],
  },
  plugins: [
    new LoadablePlugin({
      filename: 'client-manifest.json',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      automaticNameDelimiter: '-',
      automaticNameMaxLength: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

if (isProd) {
  clientConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
  );
}

module.exports = clientConfig;

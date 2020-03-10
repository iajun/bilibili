/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function generateLoaders(options) {
  const cssLoader = {
    loader: 'css-loader',
    options: {},
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('postcss-cssnext')(),
        require('cssnano')(),
        require('postcss-plugin-px2rem')({
          rootValue: 40,
          unitPrecision: 2,
          mediaQuery: false,
        }),
      ],
    },
  };

  function generateLoader(loader, loaderOptions) {
    const loaders = [];

    loaders.push(
      options.extract ? MiniCssExtractPlugin.loader : 'style-loader',
    );

    if (options.modules) {
      cssLoader.options.modules = {
        localIdentName: '[local]-[hash:base64:5]',
        // sourceMap: options.sourceMap,
      };
    }

    loaders.push(cssLoader);

    options.postcss && loaders.push(postcssLoader);

    loader &&
      loaders.push({
        loader: `${loader}-loader`,
        options: { ...loaderOptions },
      });

    return loaders;
  }

  return {
    css: generateLoader(),
    scss: generateLoader('sass'),
    sass: generateLoader('sass'),
    less: generateLoader('less'),
    styl: generateLoader('stylus'),
    stylus: generateLoader('stylus'),
  };
}

function getStyleLoaders(options) {
  const output = [];
  const styleLoaders = generateLoaders(options);
  const styleModuleLoaders = generateLoaders({
    ...options,
    modules: true,
  });

  for (const key in styleLoaders) {
    const loaders = styleLoaders[key];
    const moduleLoaders = styleModuleLoaders[key];

    output.push({
      test: new RegExp(`\\.${key}$`),
      oneOf: [
        {
          resourceQuery: /modules/,
          use: moduleLoaders,
        },
        {
          use: loaders,
        },
      ],
    });
  }

  return output;
}

module.exports = getStyleLoaders;

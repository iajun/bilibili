const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function isObject(val) {
  return (
    Object.prototype.toString.call(val) === '[object Object]' && val !== null
  );
}

function generateLoaders(options) {
  const cssLoader = {
    loader: 'css-loader',
    options: {},
  };

  const postcssLoader = {
    loader: 'postcss-loader',
  };

  function generateLoader(loader, loaderOptions) {
    const loaders = [];

    loaders.push(
      options.extract
        ? {
            loader: MiniCssExtractPlugin.loader,
            options: isObject(options.extract) ? options.extract : {},
          }
        : undefined,
    );

    if (options.modules) {
      cssLoader.options.modules = {
        localIdentName: '[local]-[hash:base64:5]',
      };
    }

    loaders.push(cssLoader);

    options.postcss && loaders.push(postcssLoader);

    loader &&
      loaders.push({
        loader: `${loader}-loader`,
        options: { ...loaderOptions },
      });

    return loaders.filter(Boolean);
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

function generateStyleLoaders(options) {
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

module.exports = generateStyleLoaders;

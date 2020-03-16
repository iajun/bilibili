/*
 * @Date: 2020-03-16 13:57:22
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-16 14:07:29
 */

function generateScriptLoaders(options) {
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      caller: {
        target: options.target,
      },
    },
  };

  const rules = new Map([
    [/\.js$/, [babelLoader, 'eslint-loader']],
    [
      /\.(ts|tsx)$/,
      [babelLoader, 'awesome-typescript-loader', 'eslint-loader'],
    ],
  ]);

  return [...rules].map(([test, use]) => {
    return {
      test,
      use,
      exclude: /node_modules/,
    };
  });
}

module.exports = generateScriptLoaders;

/*
 * @Date: 2020-03-16 13:57:22
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 00:17:34
 */
const path = require('path');

function generateScriptLoaders(options) {
  const isNode = options.target === 'node';

  const preset = {
    targets: {
      // 目标环境
      browsers: [
        // 浏览器
        'last 2 versions',
        'ie >= 10',
      ],
      node: 'current', // node
    },
    // 是否转译module syntax，默认是 commonjs
    debug: true, // 是否输出启用的plugins列表
    spec: false, // 是否允许more spec compliant，但可能转译出的代码更慢
    loose: false, // 是否允许生成更简单es5的代码，但可能不那么完全符合ES6语义
    useBuiltIns: false, // 怎么运用 polyfill
    include: [], // 总是启用的 plugins
    exclude: [], // 强制不启用的 plugins
    forceAllTransforms: false, // 强制使用所有的plugins，用于只能支持ES5的uglify可以正确压缩代码
  };
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          isNode ? { ...preset, modules: 'commonjs' } : preset,
        ],
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@loadable/babel-plugin',
      ],
    },
  };

  const tsloader = {
    loader: 'awesome-typescript-loader',
    options: {
      configFileName: path.resolve(__dirname, '../../tsconfig.json'),
    },
  };

  const rules = new Map([
    [/\.js$/, [babelLoader, 'eslint-loader']],
    [/\.(ts|tsx)$/, [babelLoader, tsloader, 'eslint-loader']],
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

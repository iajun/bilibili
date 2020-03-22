/*
 * @Date: 2020-03-22 15:02:55
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 15:06:38
 */

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const render = require('./render');
const clientConfig = require('../config/webpack.config.client.js');
const serverConfig = require('../config/webpack.config.server.js');
const ssr = require('./middleware/ssr');

module.exports = function setAppEnv(app, env) {
  if (env === 'production') {
    app.use(render());
  } else {
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    clientConfig.entry.app.push('webpack-hot-middleware/client');
    const multiCompiler = webpack([clientConfig, serverConfig]);
    app.use(
      webpackDevMiddleware(multiCompiler, {
        logLevel: 'silent',
      }),
    );
    app.use(webpackHotMiddleware(multiCompiler.compilers[0]));
    app.use(
      ssr({
        render,
        multiCompiler,
      }),
    );
  }
};

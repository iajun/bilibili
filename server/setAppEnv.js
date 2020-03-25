/*
 * @Date: 2020-03-22 15:02:55
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-25 10:36:05
 */

const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const render = require('./render');
const { CLIENT_BUILD_PATH } = require('./util/paths');
const clientConfig = require('../config/webpack.config.client.js');
const serverConfig = require('../config/webpack.config.server.js');
const ssr = require('./middleware/ssr');

module.exports = function setAppEnv(app, env) {
  if (env === 'production') {
    app.use(express.static(CLIENT_BUILD_PATH));
    return void app.use(render());
  }

  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.entry.app.push('webpack-hot-middleware/client');

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const [clientCompiler, serverCompiler] = multiCompiler.compilers;

  app.use(
    webpackDevMiddleware(multiCompiler, {
      logLevel: 'warn',
    }),
  );
  app.use(webpackHotMiddleware(clientCompiler));

  app.use(
    ssr({
      render,
      multiCompiler,
    }),
  );
};

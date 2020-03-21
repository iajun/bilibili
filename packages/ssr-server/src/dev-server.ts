/**
 * @Date: 2020-03-14 20:50:20
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 09:07:18
 */

import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

import * as clientConfig from '../../web/config/webpack.config.client.js';
import * as serverConfig from '../../web/config/webpack.config.server.js';
import ssr from './middleware/ssr';
import render from './render';

const app = express();

clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
clientConfig.entry.app.push('webpack-hot-middleware/client');
const multiCompiler = webpack([clientConfig, serverConfig]);

app.use(webpackDevMiddleware(multiCompiler));
app.use(webpackHotMiddleware(multiCompiler.compilers[0]));

app.use(
  ssr({
    render,
    multiCompiler,
  }),
);

const LISTEN_PORT = 3020;

app.listen(LISTEN_PORT, function() {
  console.log('dev server is running at port 3020');
});

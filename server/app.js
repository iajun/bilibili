/*
 * @Date: 2020-03-14 20:50:20
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-14 21:19:05
 */
const setupDev = require('./utils/setupDev');
const setupProd = require('./utils/setupProd');

const Express = require('express');
const app = new Express();

const LISTEN_PORT = 3020;

const isProd = process.env.NODE_ENV === 'production';

isProd ? setupProd(app) : setupDev(app);

app.listen(LISTEN_PORT, function() {
  console.log('dev server is running at port 3020');
});

/*
 * @Date: 2020-03-14 20:50:20
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 21:59:26
 */
const setupDev = require('./lib/setupDev');
const setupProd = require('./lib/setupProd');
const resolveFromRoot = require('./util/resolveFromRoot');

const express = require('express');
const app = express();

const LISTEN_PORT = 3020;

const isProd = process.env.NODE_ENV === 'production';

app.use(express.static(resolveFromRoot('public')));

isProd ? setupProd(app) : setupDev(app);

app.listen(LISTEN_PORT, function() {
  console.log('dev server is running at port 3020');
});

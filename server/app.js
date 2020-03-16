/*
 * @Date: 2020-03-14 20:50:20
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-16 15:38:24
 */
const path = require('path');
const setupDev = require('./utils/setupDev');
const setupProd = require('./utils/setupProd');

const express = require('express');
const app = express();

const resolve = relativePath => path.resolve(__dirname, relativePath);

const LISTEN_PORT = 3020;

const isProd = process.env.NODE_ENV === 'production';

app.use(express.static(resolve('../public')));

isProd ? setupProd(app) : setupDev(app);

app.listen(LISTEN_PORT, function() {
  console.log('dev server is running at port 3020');
});

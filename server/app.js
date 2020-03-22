/*
 * @Date: 2020-03-14 20:50:20
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 22:37:59
 */
const express = require('express');
const setAppEnv = require('./setAppEnv');

const LISTEN_PORT = 3020;
const app = express();

setAppEnv(app, process.env.NODE_ENV || 'development');

app.listen(LISTEN_PORT, function() {
  console.log('server is running at port 3020');
});

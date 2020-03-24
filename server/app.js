/*
 * @Date: 2020-03-14 20:50:20
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 16:11:09
 */
const express = require('express');
const setAppEnv = require('./setAppEnv');
const request = require('./util/request');
const fs = require('fs');

const LISTEN_PORT = 3020;
const app = express();

app.get('/transfer/img', async (req, res) => {
  const response = await request({
    url: req.query.url,
    responseType: 'stream',
  });

  response.pipe(res);
});

setAppEnv(app, process.env.NODE_ENV || 'development');

app.listen(LISTEN_PORT, function () {
  console.log('server is running at port 3020');
});

/*
 * @Date: 2020-04-01 20:40:51
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 12:55:01
 */
const express = require('express');
const fetch = require('../lib/fetch');
const Err = require('../lib/error');
const cors = require('cors');
const { logger } = require('../lib/log');
require('express-async-errors');

class ApiServer {
  constructor(config) {
    this.app = express();
    this.config = config;
    this.port = config.port || 3021;
    this.routes = this.config.routes;
  }

  start() {
    this.listen(this.port);
    this.setupMiddleware();
    this.setupRoutes();
    this.setupProxy();
    this.handleError();
  }

  listen(port) {
    this.app.listen({ port }, () => {
      console.log(`Your api server is running at port ${port}`);
    });
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  setupProxy() {
    this.app.get('/proxy', cors(), async (req, res, next) => {
      const { query, url } = req;
      const proxyUrl = url.slice(url.indexOf('url=') + 4);

      let stream;
      if (query.type === 'image') {
        stream = await this.handleProxyImage(proxyUrl, req, res);
      }

      if (query.type === 'video') {
        stream = await this.handleProxyVideo(proxyUrl, req, res);
      }

      if (!stream) {
        throw new Error(Err.FETCH_DATA_ERROR);
      }

      stream.pipe(res);
    });
  }

  async handleProxyVideo(url, req, res) {
    const [start, end] = req.get('Range').replace('bytes=', '').split('-');

    const response = await fetch({
      url,
      responseType: 'stream',
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    res.status(response.status);
    res.set({ ...response.headers, 'Content-Type': 'video/mp4' });

    return response.data;
  }

  async handleProxyImage(url, req, res) {
    const data = await fetch({
      responseType: 'stream',
      url,
    });
    const imageArr = url.split('.');
    const ext = imageArr[imageArr.length - 1];

    res.set('Content-Type', `image/${ext}`);

    return data.data;
  }

  setupRoutes() {
    const routes = this.routes;
    Object.keys(routes).forEach((url) => {
      this.app.use(`/${url}`, routes[url]);
    });
  }

  handleError() {
    this.app.use(function handleError(err, req, res, next) {
      let code = '500100';
      let errMsg = '服务端出错，请您稍后再试';

      try {
        [code, errMsg] = err.message.split(':');
      } catch (error) {}

      if (isNaN(+code)) {
        errMsg = '服务端出错，请您稍后再试';
        code = '500100';
      }

      logger.error(`[errMsg]: ${err.message}`);

      res.status(+code.slice(0, 3)).send({ code, errMsg });
    });
  }
}

module.exports = ApiServer;

/*
 * @Date: 2020-04-01 20:40:51
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 12:55:01
 */
const express = require('express');
const fetch = require('../lib/fetch');
const axios = require('axios');
const Err = require('../lib/error');
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
    this.appendMiddleware(express.json());
  }

  setupProxy() {
    this.app.get('/proxy', async (req, res, next) => {
      const { query } = req;
      let stream;
      if (query.type === 'image') {
        stream = await this.handleProxyImage(req, res);
      }

      if (query.type === 'video') {
        stream = await this.handleProxyVideo(req, res);
      }

      if (!stream) {
        throw new Error(Err.FETCH_DATA_ERROR);
      }

      stream.pipe(res);
    });
  }

  async handleProxyVideo(req, res) {
    const [start, end] = req.get('Range').replace('bytes=', '').split('-');

    const url = req.query.url;
    delete req.query.url;
    delete req.query.type;

    const response = await axios({
      url,
      responseType: 'stream',
      params: req.query,
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    res.status(206);

    res.set({ ...response.headers, 'Content-Type': 'video/mp4' });

    return response.data;
  }

  handleProxyImage(req, res) {
    const imgUrl = req.query.url;
    const data = fetch({
      responseType: 'stream',
      url: imgUrl,
    });
    const imageArr = imgUrl.split('.');
    const ext = imageArr[imageArr.length - 1];

    res.set('Content-Type', `image/${ext}`);

    return data;
  }

  setupRoutes() {
    const routes = this.routes;
    Object.keys(routes).forEach((url) => {
      this.app.use(`/${url}`, routes[url]);
    });
  }

  appendMiddleware(mdw, ...args) {
    this.app.use(mdw, ...args);
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

      logger.error(`[errMsg]: ${err.message}; [stack]: ${err.stack}`);

      res.status(+code.slice(0, 3)).send({ code, errMsg });
    });
  }
}

module.exports = ApiServer;

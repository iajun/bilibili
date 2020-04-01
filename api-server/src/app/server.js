/*
 * @Date: 2020-04-01 20:40:51
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 22:57:02
 */
const express = require('express');
const fetch = require('../lib/fetch');
const Err = require('../lib/error');

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
      let data;
      if (query.type === 'image') {
        data = await this.handleProxyImage(query.url);
      }

      if (!data) {
        throw new Error(Err.FETCH_DATA_ERROR);
      }
      data.pipe(res);
    });
  }

  handleProxyImage(imgUrl) {
    const data = fetch({
      responseType: 'stream',
      url: imgUrl,
    });

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

      res.status(code.slice(0, 3)).send({ code, errMsg });
    });
  }
}

module.exports = ApiServer;

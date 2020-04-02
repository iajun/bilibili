/*
 * @Date: 2020-04-01 20:40:48
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 22:44:55
 */

const ApiServer = require('./app/server');
const config = require('./config');
const routes = require('./routes');

const serverConfig = {
  ...config,
  routes,
};

const server = new ApiServer(serverConfig);

server.start();

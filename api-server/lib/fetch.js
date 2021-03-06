/*
 * @Date: 2020-04-01 20:47:52
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 21:16:05
 */

const axios = require('axios');
const Err = require('./error');
const { logger } = require('./log');
const qs = require('querystring');

const baseHeader = {
  'User-Agent':
    'illa/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36',
};
const instance = axios.create({
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers = { ...config.headers, ...baseHeader };
    return config;
  },
  () => {
    throw new Error(Err.SERVER_FETCH_DATA_ERROR);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err, res) => {
    const config = err.config;

    let url, method;

    if ((method = config.method = 'get')) {
      url = config.url + '?' + qs.stringify(config.params);
    }

    logger.error(`fetch data error: method: ${method}, url: ${url}`);
    throw new Error(Err.SERVER_FETCH_DATA_ERROR);
  },
);

module.exports = instance;

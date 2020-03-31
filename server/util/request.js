/*
 * @Date: 2020-03-19 23:17:12
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-30 16:50:51
 */
const axios = require('axios');

const defaultAxiosRequestConfig = {
  method: 'GET',
  headers: {
    'User-Agent':
      'illa/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36',
  },
  timeout: 10000
};

async function request(config) {
  const axiosConfig = Object.assign({}, defaultAxiosRequestConfig, config);
  let response;
  try {
    response = await axios(axiosConfig);
  } catch (error) {
    console.log('axios: error\n\n', error);
  }
  return response.data;
}

module.exports = request;

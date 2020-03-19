/*
 * @Date: 2020-03-19 23:17:12
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 23:29:42
 */
import axios, { AxiosRequestConfig } from 'axios';

const defaultAxiosRequestConfig: AxiosRequestConfig = {
  method: 'GET',
  headers: {
    'User-Agent':
      'illa/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36',
  },
};

async function request(config: AxiosRequestConfig) {
  const axiosConfig = Object.assign({}, defaultAxiosRequestConfig, config);
  const response = await axios(axiosConfig);
  return response.data;
}

export default request;

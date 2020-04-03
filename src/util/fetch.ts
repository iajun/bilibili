/*
 * @Date: 2020-04-02 00:42:17
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 22:05:03
 */
import axios from 'axios';

const instance = axios.create({
  timeout: 50000,
  baseURL: 'http://localhost:3021',
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((data) => {
  return data;
});

export default instance;

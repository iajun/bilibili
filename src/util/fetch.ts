/*
 * @Date: 2020-04-02 00:42:17
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 10:06:26
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
  return data.data;
});

export default instance;

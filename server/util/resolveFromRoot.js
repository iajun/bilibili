/*
 * @Date: 2020-03-19 20:34:30
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 20:35:03
 */

const path = require('path');

module.exports = (...relativePath) =>
  path.resolve(__dirname, '../..', ...relativePath);

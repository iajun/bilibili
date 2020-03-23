/*
 * @Date: 2020-03-22 22:34:10
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 00:00:18
 */
const path = require('path');
const resolve = relpath => path.resolve(__dirname, '../..', relpath);

const CLIENT_BUILD_PATH = resolve('dist');
const PUBLIC_PATH = resolve('public');
const CSS_PATH = resolve('public/css');
const TEMPLATE_PATH = resolve('public/html');
const JS_PATH = resolve('public/js');

const MANIFEST_PATH = `${CLIENT_BUILD_PATH}/client-manifest.json`;
const SERVERBUNDLE_PATH = `${CLIENT_BUILD_PATH}/serverbundle.js`;

module.exports = {
  CLIENT_BUILD_PATH,
  PUBLIC_PATH,
  CSS_PATH,
  TEMPLATE_PATH,
  JS_PATH,
  MANIFEST_PATH,
  SERVERBUNDLE_PATH,
};

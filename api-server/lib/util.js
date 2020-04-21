/*
 * @Date: 2020-04-01 22:23:05
 * @Author: Sharp
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-21 15:58:09
 */

const vm = require('vm');
const Err = require('./error');

exports.extractState = function extractState(html) {
  const REGEX = /(window\.__INITIAL_STATE__.*?)\(function.*?<\/script>/gs;
  const matches = REGEX.exec(html);

  const context = vm.createContext({
    window: {},
  });

  try {
    vm.runInContext(matches[1], context);
  } catch (error) {
    throw new Error(Err.SERVER_EXTRACT_STATE_ERROR);
  }

  return context.window.__INITIAL_STATE__ || {};
};

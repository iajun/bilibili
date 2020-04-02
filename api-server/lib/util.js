/*
 * @Date: 2020-04-01 22:23:05
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 22:34:49
 */

const vm = require('vm');
const Err = require('./error');

exports.extractState = function extractState(html) {
  const REGEX = /(window.__INITIAL_STATE__.*?;)/gs;
  const matches = html.match(REGEX);

  const context = vm.createContext({
    window: {},
  });

  try {
    vm.runInContext(matches[0], context);
  } catch (error) {
    throw new Error(Err.SERVER_EXTRACT_STATE_ERROR);
  }

  return context.window.__INITIAL_STATE__ || {};
};

/*
 * @Date: 2020-03-19 22:24:56
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 23:52:46
 */
import vm from 'vm';

const REGEX = /(window.__INITIAL_STATE__.*?;)/gs;

export default function extractState(html: string) {
  const matches = html.match(REGEX);
  if (!matches) return;

  const ctx = vm.createContext({
    window: {},
  });
  vm.runInNewContext(matches[0], ctx);

  return ctx.window.__INITIAL_STATE__ || {};
}

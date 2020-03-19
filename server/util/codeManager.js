/*
 * @Date: 2020-03-18 22:01:35
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-18 22:54:59
 */

const vm = require('vm');

class CodeManager {
  constructor(code) {
    this.code = code;
    this.ctx = vm.createContext({
      module,
      require,
      console,
    });
  }

  exec() {
    return vm.runInContext(this.code, this.ctx);
  }
}

module.exports = CodeManager;

'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const { promisify } = util;

exports.readFile = path => promisify(fs.readFile)(path, 'utf-8');

exports.resolvePath = (...relativePath) =>
  path.resolve(__dirname, '../..', ...relativePath);

exports.compose = function compose() {
  var fns = [].slice.call(arguments);
  return function(initialArg) {
    var res = initialArg;
    for (var i = fns.length - 1; i > -1; i--) {
      res = fns[i](res);
    }
    return res;
  };
};

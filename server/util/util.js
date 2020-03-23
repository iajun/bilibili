'use strict';

const fs = require('fs');
const util = require('util');
const { promisify } = util;

/**
 * @param {path} filepath file needed to read
 * @returns: promise<filedata>
 */
function readFile(path) {
  return promisify(fs.readFile)(path, 'utf-8');
}

/**
 * compose functions
 *
 * @param {array}  [list] array of functions
 * @returns: a composed function
 */
function compose() {
  var fns = [].slice.call(arguments);
  return function(initialArg) {
    var res = initialArg;
    for (var i = fns.length - 1; i > -1; i--) {
      res = fns[i](res);
    }
    return res;
  };
}

/**
 * Description: get customerd css/js file data string
 * Notice: you should parse {filename: filepath ... }
 *
 * @param {object} {files} {filename: filepath}
 * @returns:Object {filename => data string}
 */
function getFileData(files) {
  const keys = Object.keys(files);
  const promises = keys.map(filename => readFile(files[filename]));
  return Promise.all(promises).then(data => {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = data[i];
    }
    return obj;
  });
}

module.exports = {
  readFile,
  compose,
  getFileData,
};

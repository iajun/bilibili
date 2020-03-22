'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const { promisify } = util;

exports.readFile = path => promisify(fs.readFile)(path, 'utf-8');

exports.resolvePath = (...relativePath) =>
  path.resolve(__dirname, '../..', ...relativePath);

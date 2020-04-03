/*
 * @Date: 2020-04-03 12:45:54
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 12:50:46
 */
const log = require('log4js');

log.configure({
  appenders: {
    out: { type: 'console' },
    allLog: {
      type: 'file',
      filename: 'all.log',
      keepFileExt: true,
      maxLogSize: 10485760,
      backups: 2,
    },
    errorLog: {
      type: 'file',
      filename: 'err.log',
    },
  },
  categories: {
    default: {
      appenders: ['out', 'allLog', 'errorLog'],
      level: 'debug',
    },
  },
});

const logger = log.getLogger('default');

module.exports = {
  logger,
};

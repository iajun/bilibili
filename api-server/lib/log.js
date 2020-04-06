/*
 * @Date: 2020-04-03 12:45:54
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 12:50:46
 */

// %r time in toLocaleTimeString format
// %p log level
// %c log category
// %h hostname
// %m log data
// %d date, formatted - default is ISO8601, format options are: ISO8601, ISO8601_WITH_TZ_OFFSET, ABSOLUTE, DATE, or any string compatible with the date-format library. e.g. %d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}
// %% % - for when you want a literal % in your output
// %n newline
// %z process id (from process.pid)
// %f full path of filename (requires enableCallStack: true on the category, see configuration object)
// %f{depth} path’s depth let you chose to have only filename (%f{1}) or a chosen number of directories
// %l line number (requires enableCallStack: true on the category, see configuration object)
// %o column postion (requires enableCallStack: true on the category, see configuration object)
// %s call stack (requires enableCallStack: true on the category, see configuration object)
// %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter.
// %X{<tokenname>} add values from the Logger context. Tokens are keys into the context values.
// %[ start a coloured block (colour will be taken from the log level, similar to colouredLayout)
// %] end a coloured block

const log = require('log4js');

log.configure({
  appenders: {
    out: { type: 'console' },
    error: {
      type: 'DateFile',
      filename: 'err.log',
      pattern: 'yyyy-MM-DD.err.log',
      layout: {
        type: 'pattern',
        pattern: '[%d][%p] %f %l %s',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
    },
    error: {
      appenders: ['error', 'out'],
      level: 'error',
      enableCallStack: true,
    },
  },
});

const logger = log.getLogger('error');

module.exports = {
  logger,
};

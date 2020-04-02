/*
 * @Date: 2020-04-01 22:28:29
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 23:09:01
 */
const fetch = require('../lib/fetch');
const { extractState } = require('../lib/util');
const URL = require('./url');

exports.fetchPartitionList = async function fetchPartitionList(params) {
  const { partitionList } = extractState(
    await fetch({
      url: URL.PARTITION,
    }),
  );

  return partitionList['0'].map(({ tid, typename }) => {
    return {
      tid,
      typename,
      subPartition: partitionList[tid] || [],
    };
  });
};

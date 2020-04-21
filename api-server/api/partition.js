/*
 * @Date: 2020-04-01 22:28:29
 * @Author: Sharp
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-21 13:32:11
 */
const fetch = require('../lib/fetch');
const { extractState } = require('../lib/util');
const URL = require('./url');

exports.fetchPartitionList = async function fetchPartitionList(params) {
  const data = await fetch({
    url: URL.PARTITION,
  });

  const { partitionList } = extractState(data.data);

  return partitionList['0'].map(({ tid, typename }) => {
    return {
      tid,
      typename,
      subPartition: partitionList[tid] || [],
    };
  });
};

exports.fetchPartitionList = async function fetchPartitionList() {
  return [
    {
      typename: '动画',
      tid: 1,
      subPartition: [
        { tid: 24, typename: '推荐' },
        { tid: 25, typename: 'MAD·AMV' },
        { tid: 47, typename: 'MMD·3D' },
        { tid: 86, typename: '短片·手书·配音' },
        { tid: 27, typename: '特摄' },
      ],
    },
    {
      typename: '番剧',
      tid: 13,
      subPartition: [
        { tid: 33, typename: '连载动画' },
        { tid: 32, typename: '完结动画' },
        { tid: 51, typename: '资讯' },
        { tid: 152, typename: '官方延伸' },
      ],
    },
    {
      typename: '国创',
      tid: 167,
      subPartition: [
        { tid: 153, typename: '国产动画' },
        { tid: 168, typename: '国产原创相关' },
        { tid: 169, typename: '布袋戏' },
        { tid: 195, typename: '动态' },
      ],
    },
    { typename: '音乐', tid: 3, subPartition: [] },
    { typename: '舞蹈', tid: 129, subPartition: [] },
    { typename: '游戏', tid: 4, subPartition: [] },
    { typename: '科技', tid: 36, subPartition: [] },
    { typename: '数码', tid: 188, subPartition: [] },
    { typename: '生活', tid: 160, subPartition: [] },
    { typename: '鬼畜', tid: 119, subPartition: [] },
    { typename: '时尚', tid: 155, subPartition: [] },
    { typename: '娱乐', tid: 5, subPartition: [] },
    { typename: '影视', tid: 181, subPartition: [] },
    { typename: '广告', tid: 165, subPartition: [] },
    { typename: '纪录片', tid: 177, subPartition: [] },
    { typename: '电影', tid: 23, subPartition: [] },
    { typename: '电视剧', tid: 11, subPartition: [] },
  ];
};

/*
 * @Date: 2020-04-01 22:24:15
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 15:47:34
 */
const express = require('express');
const Err = require('../lib/error');
const { fetchVideoList, fetchVideoInfo } = require('../api');

const router = express.Router();

router.get('/', async function (req, res, next) {
  const data = await fetchVideoList(req.query || {});
  res.send(data);
});

router.get('/info', async function (req, res) {
  if (!req.query.aid) {
    throw new Error(Err.VIDEO_INFO_AID_ERROR);
  }
  let data = await fetchVideoInfo(req.query.aid);
  data && data.reduxAsyncConnect ? (data = data.reduxAsyncConnect) : {};

  const videoTags = data.videoTag || [];
  const videoInfo = data.videoInfo || {};

  res.send({
    videoTags,
    videoInfo,
  });
});

module.exports = router;

/*
 * @Date: 2020-04-01 22:24:15
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 20:21:32
 */
const express = require('express');
const Err = require('../lib/error');
const { fetchVideoList, fetchVideoInfo, fetchRelatedVideo } = require('../api');

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

router.get('/related', async function (req, res, next) {
  if (!req.query.aid) {
    throw new Error(Err.VIDEO_INFO_AID_ERROR);
  }
  const data = await fetchRelatedVideo(req.query.aid);
  res.send(data);
});

module.exports = router;

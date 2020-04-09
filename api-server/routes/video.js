/*
 * @Date: 2020-04-01 22:24:15
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 20:21:32
 */
const express = require('express');
const Err = require('../lib/error');
const { xml2json } = require('xml-js');
const { fetchVideoList, fetchVideoInfo, fetchRelatedVideo, fetchVideoComments } = require('../api');

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

router.get('/barrage', async function (req, res, next) {
  if (!req.query.cid) {
    throw new Error(Err.VIDEO_CID_REQUIRED_ERROR);
  }
  let data = await fetchVideoComments(req.query.cid);

  data = JSON.parse(xml2json(data));

  data = data.elements[0].elements;
  const ret = [];
  data.forEach(({ attributes = {}, elements: [{ text }] }) => {
    const _data = { text };
    if (attributes.p) {
      const [time, type, , color, sendTime] = attributes.p.split(',');
      _data.time = +time;
      _data.type = +type;
      _data.color = '#' + (+color).toString(16);
      _data.sendTime = +sendTime * 1000;

      ret.push(_data);
    }
  });
  res.send(ret);

  // data.pipe(res);
});

module.exports = router;

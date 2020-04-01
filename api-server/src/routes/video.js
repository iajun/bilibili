/*
 * @Date: 2020-04-01 22:24:15
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 23:37:59
 */
const express = require('express');
const { fetchRankingVideos, fetchRankingRegionVideos } = require('../api');

const router = express.Router();

router.get('/ranking', async function (req, res, next) {
  const data = await fetchRankingVideos(req.query || {});
  res.send(data);
});

router.get('/ranking/region', async function (req, res) {
  const data = await fetchRankingRegionVideos(req.query);
  res.send(data);
});

module.exports = router;

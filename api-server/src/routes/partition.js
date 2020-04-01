/*
 * @Date: 2020-04-01 22:24:15
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 23:02:24
 */
const express = require('express');
const { fetchPartitionList } = require('../api');

const router = express.Router();

router.get('/', async function handlePartitionIndexRoute(req, res, next) {
  const data = await fetchPartitionList();
  res.send(data);
});

module.exports = router;

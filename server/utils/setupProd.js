/*
 * @Date: 2020-03-14 20:58:23
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-14 21:11:16
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const ServerRender = require('./renderer');

const resolve = relativePath => path.resolve(__dirname, relativePath);

const setupProd = app => {
  const MANIFEST_PATH = resolve('../../dist/client-manifest.json');
  const SERVERBUNDLE_PATH = resolve('../../dist/serverbundle.js');

  const template = fs.readFileSync(
    resolve('../../templates/index.html'),
    'utf-8',
  );
  const clientManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const serverbundle = fs.readFileSync(SERVERBUNDLE_PATH, 'utf-8');

  const renderer = new ServerRender(template, clientManifest, serverbundle);

  app.use(express.static(resolve('../dist')));

  app.get('*', (req, res) => {
    res.send(renderer.render(req, res));
  });
};

module.exports = setupProd;

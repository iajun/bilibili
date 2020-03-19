/*
 * @Date: 2020-03-14 20:58:23
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 20:49:50
 */

const express = require('express');
const fs = require('fs');
const resolveFromRoot = require('../util/resolveFromRoot');
const ServerRender = require('./renderer');

const setupProd = app => {
  const MANIFEST_PATH = resolveFromRoot('dist/client-manifest.json');
  const SERVERBUNDLE_PATH = resolveFromRoot('dist/serverbundle.js');

  const template = fs.readFileSync(
    resolveFromRoot('public/html/index.html'),
    'utf-8',
  );

  const clientManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const serverbundle = fs.readFileSync(SERVERBUNDLE_PATH, 'utf-8');

  const renderer = new ServerRender(template, clientManifest, serverbundle);

  app.use(express.static(resolveFromRoot('dist')));

  app.get('*', (req, res) => {
    renderer.render(req, res).then(html => res.send(html));
  });
};

module.exports = setupProd;

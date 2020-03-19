/*
 * @Date: 2020-03-09 14:34:38
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 20:42:21
 */

const fs = require('fs');
const watcher = require('../util/watcher');
const ServerRender = require('./renderer');
const resolveFromRoot = require('../util/resolveFromRoot');

const setupDev = app => {
  const template = fs.readFileSync(
    resolveFromRoot('public/html/index.html'),
    'utf-8',
  );

  let renderer;
  const watcherPromise = watcher(app, function cb(
    clientManifest,
    serverbundle,
  ) {
    renderer = new ServerRender(template, clientManifest, serverbundle);
  });

  app.get('*', (req, res) => {
    watcherPromise.then(() => {
      renderer.render(req, res).then(html => res.send(html));
    });
  });
};

module.exports = setupDev;

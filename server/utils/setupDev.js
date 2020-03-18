/*
 * @Date: 2020-03-09 14:34:38
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-18 11:21:49
 */

const fs = require('fs');
const path = require('path');
const watcher = require('./watcher');
const ServerRender = require('./renderer');

const resolve = relativePath => path.resolve(__dirname, relativePath);

const setupDev = app => {
  const template = fs.readFileSync(
    resolve('../../public/html/index.html'),
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

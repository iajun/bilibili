/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Date: 2020-03-09 14:34:38
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-09 15:09:18
 */

const fs = require('fs');
const Express = require('express');
const watcher = require('./webpack-watch');
const ServerRender = require('./renderer');

const resolve = relativePath =>
  require('path').resolve(__dirname, relativePath);

let renderer = null;

const app = new Express();
const template = fs.readFileSync(resolve('../templates/index.html'), 'utf-8');

const watcherPromise = watcher(app, function cb(clientManifest, serverbundle) {
  renderer = new ServerRender(template, clientManifest, serverbundle);
});

app.get('*', (req, res) => {
  watcherPromise.then(() => {
    res.send(renderer.render(req, res));
  });
});

app.listen(3020, function cb() {
  console.log('dev server is running at port 3020');
});

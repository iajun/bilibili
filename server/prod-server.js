/*
 * @Date: 2020-03-09 14:31:34
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-09 15:09:26
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const Express = require('express');
const ServerRender = require('./renderer');

const resolve = relativePath =>
  require('path').resolve(__dirname, relativePath);

const MANIFEST_PATH = resolve('../dist/client-manifest.json');
const SERVERBUNDLE_PATH = resolve('../dist/serverbundle.js');

const app = new Express();
const template = fs.readFileSync(resolve('../templates/index.html'), 'utf-8');
const clientManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
const serverbundle = fs.readFileSync(SERVERBUNDLE_PATH, 'utf-8');

const renderer = new ServerRender(template, clientManifest, serverbundle);

app.use(Express.static(resolve('../dist')));

app.get('*', (req, res) => {
  res.send(renderer.render(req, res));
});

app.listen(3020, function cb() {
  console.log('prod server is running at port 3020');
});

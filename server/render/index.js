'use strict';

const path = require('path');
const fs = require('fs');
const ReactDom = require('react-dom/server');
const requireFromString = require('require-from-string');
const template_1 = require('./template');
const data_1 = require('./data');
const TEMPLATE_PATH = path.resolve(__dirname, '../../public/html');
const CSS_PATH = path.resolve(__dirname, '../../public/css');
const JS_PATH = path.resolve(__dirname, '../../public/js');
const DIST_PATH = path.resolve(__dirname, '../../dist');
const extraFiles = {
  'normalize.css': `${CSS_PATH}/normalize.css`,
  'viewport.js': `${JS_PATH}/viewport.js`,
};
function normalizeOptions(options) {
  const CLIENTMANIFEST_PATH = `${DIST_PATH}/client-manifest.json`;
  const SERVERBUNDLE_PATH = `${DIST_PATH}/serverbundle.js`;
  if (typeof options === 'undefined') {
    options = {
      clientManifest: {},
      serverbundle: '',
    };
  }
  const template = options.template || `${TEMPLATE_PATH}/index.html`;
  let clientManifest, serverbundle;
  if (fs.existsSync(CLIENTMANIFEST_PATH)) {
    clientManifest = JSON.parse(fs.readFileSync(CLIENTMANIFEST_PATH, 'utf-8'));
  } else {
    clientManifest = options.clientManifest;
  }
  if (fs.existsSync(SERVERBUNDLE_PATH)) {
    serverbundle = fs.readFileSync(SERVERBUNDLE_PATH, 'utf-8');
  } else {
    serverbundle = options.serverbundle;
  }
  return { clientManifest, serverbundle, template };
}
const render = options => async (req, res) => {
  const { clientManifest, serverbundle, template } = normalizeOptions(options);
  const { createApp } = requireFromString(serverbundle);
  const extractor = data_1.getExtractor(clientManifest, ['app']);
  const extractedData = data_1.getExtractedData(clientManifest, ['app']);
  const extraData = await data_1.getExtraData(extraFiles);
  const app = ReactDom.renderToString(
    extractor.collectChunks(createApp(req.url, {})),
  );
  const parseData = {
    ...extractedData,
    ...extraData,
    app,
  };
  const html = await template_1.parseTemplate(template, parseData, {
    minify: true,
  });

  res.send(html);
};

module.exports = render;

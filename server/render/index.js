'use strict';

const fs = require('fs');
const ReactDom = require('react-dom/server');
const requireFromString = require('require-from-string');
const { parseTemplate } = require('./template');
const { getExtractor, getExtractedData, getExtraData } = require('./data');
const {
  TEMPLATE_PATH,
  SERVERBUNDLE_PATH,
  MANIFEST_PATH,
  JS_PATH,
  CSS_PATH,
} = require('../util/paths');

/**
 * normalize options in case of it is lacked or invalid
 *
 * @param {options}
 * @returns: options
 */
function normalizeOptions(options) {
  options = options || {};
  options.template = options.template || `${TEMPLATE_PATH}/index.html`;

  try {
    options.clientManifest =
      options.clientManifest ||
      JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));

    options.serverbundle =
      options.serverbundle || fs.readFileSync(SERVERBUNDLE_PATH, 'utf-8');
  } catch (e) {
    throw new Error(
      'You should build your project first in production mode, or pass client manifest and server bundle to make it work!',
    );
  }

  return options;
}

const render = options => async (req, res) => {
  const { clientManifest, serverbundle, template } = normalizeOptions(options);

  const extraFiles = {
    'normalize.css': `${CSS_PATH}/normalize.css`,
    'viewport.js': `${JS_PATH}/viewport.js`,
  };

  const { createApp } = requireFromString(serverbundle);
  const extractor = getExtractor(clientManifest, ['app']);
  const app = ReactDom.renderToString(
    extractor.collectChunks(createApp(req.url, {})),
  );

  const extractedData = getExtractedData(extractor);
  const extraData = await getExtraData(extraFiles);

  const parseData = {
    ...extractedData,
    ...extraData,
    app,
  };

  const html = await parseTemplate(template, parseData, {
    minify: true,
  });

  res.send(html);
};

module.exports = render;

'use strict';

const fs = require('fs');
const ReactDom = require('react-dom/server');
const requireFromString = require('require-from-string');
const { parseTemplate } = require('./template');
const { getExtractor, getExtractedData } = require('./data');
const { getFileData } = require('../util/util');
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

/**
 * check url if render middleware should respond it.
 *
 * url with ext likes .svg, .png, .jpg, ..... will not render.
 *
 * the rendering url should not contains '.'
 *
 * @param {string} url
 * @returns {boolean} if the url is valid to render
 */
function isValidRenderURL(url) {
  return !~url.indexOf('.');
}

/**
 * render middileware
 *
 * options contains: template to be rendered, manifest to be read, serverbundle to run
 * if you don't parse options, it will use default files from client dist path
 *
 * @param {object} options template, serverbundle, clientmanifest
 * @returns {string} htmlstring
 */
const render = options => async (req, res, next) => {
  if (!isValidRenderURL(req.url)) {
    next();
  }

  const { clientManifest, serverbundle, template } = normalizeOptions(options);
  const extraFiles = {
    'normalize.css': `${CSS_PATH}/normalize.css`,
    'viewport.js': `${JS_PATH}/viewport.js`,
  };

  const { createApp } = requireFromString(serverbundle);
  const extractor = getExtractor(clientManifest, ['app']);

  // rendertostring must be before extracting tags, or cause error
  const app = ReactDom.renderToString(
    extractor.collectChunks(createApp(req.url, {})),
  );

  // extracted data like link tags, script tags, styles etc
  const extractedData = getExtractedData(extractor);
  // customed file data like other css, js files
  const extraData = await getFileData(extraFiles);

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
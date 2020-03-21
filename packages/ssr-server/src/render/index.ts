/*
 * @Date: 2020-03-21 19:17:29
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:40:29
 */

import * as path from 'path';
import * as fs from 'fs';
import { Request, Response } from 'express';
import * as ReactDom from 'react-dom/server';
import * as requireFromString from 'require-from-string';
import { parseTemplate } from './template';
import { getExtractedData, getExtraData, getExtractor } from './data';

const TEMPLATE_PATH = path.resolve(__dirname, '../../public/html');
const CSS_PATH = path.resolve(__dirname, '../../public/css');
const JS_PATH = path.resolve(__dirname, '../../public/js');
const DIST_PATH = path.resolve(__dirname, '../../dist');

const extraFiles = {
  'normalize.css': `${CSS_PATH}/normalize.css`,
  'viewport.js': `${JS_PATH}/viewport.js`,
};

export interface RenderOptions {
  clientManifest: Record<string, any>;
  serverbundle: string;
  template?: string;
}

function normalizeOptions(options?: RenderOptions) {
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

const render = (options?: RenderOptions) => async (
  req: Request,
  res: Response,
) => {
  const { clientManifest, serverbundle, template } = normalizeOptions(options);
  const { createApp } = requireFromString(serverbundle);

  const extractor = getExtractor(clientManifest, ['app']);
  const extractedData = getExtractedData(clientManifest, ['app']);
  const extraData = await getExtraData(extraFiles);
  const app = ReactDom.renderToString(
    extractor.collectChunks(createApp(req.url, {})),
  );
  const parseData = {
    ...extractedData,
    ...extraData,
    app,
  };

  const html = await parseTemplate(template, parseData, {
    minify: true,
  });

  res.send(html);

  //
};

export default render;

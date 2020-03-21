/*
 * @Date: 2020-03-21 20:29:09
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:05:51
 */

import * as loadableServer from '@loadable/server';
import { readFile } from '../util/util';

export function getExtractor(stats: JSON, entrypoints: string[]) {
  return new loadableServer.ChunkExtractor({
    stats,
    entrypoints,
  });
}

export function getExtractedData(stats: JSON, entrypoints: string[]) {
  const extractor = getExtractor(stats, entrypoints);

  return {
    link: extractor.getLinkTags(),
    style: extractor.getStyleTags(),
    script: extractor.getScriptTags(),
  };
}

export function getExtraData(extraFiles: Record<string, string>) {
  const keys = Object.keys(extraFiles);
  const promises = keys.map(filename => readFile(extraFiles[filename]));

  return Promise.all(promises).then(data => {
    const obj: typeof extraFiles = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = data[i];
    }
    return obj;
  });
}

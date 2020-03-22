'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const loadableServer = require('@loadable/server');
const util_1 = require('../util/util');
function getExtractor(stats, entrypoints) {
  return new loadableServer.ChunkExtractor({
    stats,
    entrypoints,
  });
}
exports.getExtractor = getExtractor;
function getExtractedData(stats, entrypoints) {
  const extractor = getExtractor(stats, entrypoints);
  return {
    link: extractor.getLinkTags(),
    style: extractor.getStyleTags(),
    script: extractor.getScriptTags(),
  };
}
exports.getExtractedData = getExtractedData;
function getExtraData(extraFiles) {
  const keys = Object.keys(extraFiles);
  const promises = keys.map(filename => util_1.readFile(extraFiles[filename]));
  return Promise.all(promises).then(data => {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = data[i];
    }
    return obj;
  });
}
exports.getExtraData = getExtraData;

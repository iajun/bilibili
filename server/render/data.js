const loadableServer = require('@loadable/server');
const { readFile } = require('../util/util');

function getExtractor(stats, entrypoints) {
  return new loadableServer.ChunkExtractor({
    stats,
    entrypoints,
  });
}

exports.getExtractor = getExtractor;

/**
 * get customerd css/js file data string
 *
 * @param {Object} manifest
 * @param {Array} entrypoints entrypoint
 * @returns:Object, contains filename => data string
 */
function getExtractedData(extractor) {
  return {
    link: extractor.getLinkTags(),
    style: extractor.getStyleTags(),
    script: extractor.getScriptTags(),
  };
}

exports.getExtractedData = getExtractedData;

/**
 * get customerd css/js file data string
 *
 * @param {files}
 * @returns:Object, contains filename => data string
 */
function getExtraData(extraFiles) {
  const keys = Object.keys(extraFiles);
  const promises = keys.map(filename => readFile(extraFiles[filename]));
  return Promise.all(promises).then(data => {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = data[i];
    }
    return obj;
  });
}
exports.getExtraData = getExtraData;

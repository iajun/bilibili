const loadableServer = require('@loadable/server');

/**
 * @param {Object} manifest
 * @param {Array} entrypoints entrypoint
 * @returns: an extractor by loadable components
 */
function getExtractor(stats, entrypoints) {
  return new loadableServer.ChunkExtractor({
    stats,
    entrypoints,
  });
}

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

module.exports = {
  getExtractor,
  getExtractedData,
};

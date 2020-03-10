/* eslint-disable @typescript-eslint/no-var-requires */
const vm = require('vm');
const { ChunkExtractor } = require('@loadable/server');
// const { matchRoutes } = require('react-router-config');
const { renderToString } = require('react-dom/server');

class ServerRenderer {
  constructor(template, clientManifest, serverbundle) {
    this.template = template;
    this.clientManifest = clientManifest;
    this.serverbundle = serverbundle;

    this._init();
  }

  _init() {
    this._runServerbundle();
  }

  /**
   * run bundled entry-server code
   */
  _runServerbundle() {
    const context = vm.createContext({ module, require });
    // this.createApp, this.routes, this.createStore
    Object.assign(this, vm.runInContext(this.serverbundle, context));
  }

  /**
   * render html strings
   *
   * @param {object} requset
   * @param {object} response
   * @returns {string} html string
   */
  render(req) {
    // @loadable ssr
    const extractor = new ChunkExtractor({
      stats: this.clientManifest,
      entrypoints: ['app'],
    });

    const app = extractor.collectChunks(this.createApp(req.url, {}));

    console.log(renderToString(app));

    const htmlString = this.template
      .replace(
        '<!--react-ssr-head-->',
        `\n${extractor.getLinkTags()}\n${extractor.getStyleTags()}`,
      )
      .replace(
        '<!--react-ssr-outlet-->',
        `<div id='app'>${renderToString(app)}</div>
            ${extractor.getScriptTags()}`,
      );

    return htmlString;
  }
}

module.exports = ServerRenderer;

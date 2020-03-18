const vm = require('vm');
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const { ChunkExtractor } = require('@loadable/server');
// const { matchRoutes } = require('react-router-config');
const { renderToString } = require('react-dom/server');

const resolveFromSrc = relativePath =>
  path.resolve(__dirname, '../..', relativePath);

class ServerRenderer {
  minifyOptions = {
    removeAttributeQuotes: true,
    removeComments: true,
    removeOptionalTags: true,
    collapseInlineTagWhitespace: true,
    removeTagWhitespace: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true,
  };

  constructor(template, clientManifest, serverbundle) {
    this.template = template;
    this.clientManifest = clientManifest;
    this.serverbundle = serverbundle;

    this.embedJsFiles = [resolveFromSrc('public/js/viewport.js')];
    this.embedCssFiles = [resolveFromSrc('public/css/normalize.css')];

    this.runServerbundle();
  }

  /**
   * run bundled entry-server code
   */
  runServerbundle() {
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
  async render(req) {
    // @loadable ssr
    const extractor = new ChunkExtractor({
      stats: this.clientManifest,
      entrypoints: ['app'],
    });

    const app = extractor.collectChunks(this.createApp(req.url, {}));

    // const [jsList, cssList] = await Promise.all([
    //   getEmbedJs(this.embedJsFiles),
    //   getEmbedCss(this.embedCssFiles),
    // ]);

    const jsList = this.embedJsFiles.map(
      filepath =>
        `<script type="text/javascript">${fs.readFileSync(
          filepath,
          'utf-8',
        )}</script>`,
    );

    const cssList = this.embedCssFiles.map(
      filepath =>
        `<style type="text/css">${fs.readFileSync(filepath, 'utf-8')}</style>`,
    );

    const htmlString = this.template
      .replace(
        '<!--react-ssr-head-->',
        `${extractor.getLinkTags()}\n${extractor.getStyleTags()}
         ${cssList.join()}`,
      )
      .replace(
        '<!--react-ssr-outlet-->',
        `<div id='app'>${renderToString(app)}</div>
            ${jsList.join()}
            ${extractor.getScriptTags()}`,
      );

    return minify(htmlString, this.minifyOptions);
  }
}

module.exports = ServerRenderer;

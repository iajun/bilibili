const webpack = require('webpack');
const path = require('path');
const MFS = require('memory-fs');
const clientConfig = require('../../config/webpack.config.client');
const serverConfig = require('../../config/webpack.config.server');

function setHotApp(app, config) {
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.output.publicPath = '/';

  compiler = webpack(config);

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    publicPath: config.output.publicPath,
  });
  app.use(devMiddleware);
  app.use(require('webpack-hot-middleware')(compiler));

  return {
    compiler,
    devMiddleware,
  };
}

function readFile(fs, config, filename) {
  return fs.readFileSync(path.resolve(config.output.path, filename), 'utf-8');
}

module.exports = function(app, cb) {
  let clientManifest, serverbundle, resolve;

  const readyPromise = new Promise(r => {
    resolve = r;
  });

  function update() {
    if (clientManifest && serverbundle) {
      cb(clientManifest, serverbundle);
      resolve();
    }
  }

  // set webpack hot module of client
  const {
    devMiddleware: clientDevMiddleware,
    compiler: clientCompiler,
  } = setHotApp(app, clientConfig);

  clientCompiler.hooks.done.tap('done', () => {
    clientManifest = JSON.parse(
      readFile(
        clientDevMiddleware.fileSystem,
        clientConfig,
        'client-manifest.json',
      ),
    );

    update();
  });

  // config server side of webpack
  const mfs = new MFS();
  const serverCompiler = webpack(serverConfig);
  serverCompiler.outputFileSystem = mfs;

  serverCompiler.watch({}, (err, stats) => {
    const info = stats.toJson();

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    serverbundle = readFile(mfs, serverConfig, 'serverbundle.js');
  });

  return readyPromise;
};

const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const MFS = require('memory-fs');
const fs = require('fs');
const { fork } = require('child_process');
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

  let childProcess;
  serverCompiler.watch({}, (err, stats) => {
    const info = stats.toJson();

    if (stats.hasWarnings()) {
      console.warn(chalk.blue(info.warnings));
    }

    if (stats.hasErrors()) {
      console.error(chalk.red(info.errors));
    }

    info.assets.forEach(({ name, emitted }) => {
      if (emitted === false) return;

      const bundle = readFile(mfs, serverConfig, name);

      if (name === 'ssr-server.js') {
        serverbundle = bundle;
        update();
      }

      if (name === 'gql-server.js') {
        childProcess && childProcess.kill('SIGTERM');
        fs.writeFileSync(name, bundle);
        childProcess = fork('gql-server.js');
        setTimeout(() => {
          fs.unlinkSync(name);
        }, 3000);
      }
    });
  });

  return readyPromise;
};

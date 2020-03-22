const ssr = ({ multiCompiler, render }) => (req, res, next) => {
  const [clientCompiler, serverCompiler] = multiCompiler.compilers;
  function readMfsFile(compiler, filename) {
    const { path } = compiler.options.output;
    return compiler.outputFileSystem.readFileSync(
      `${path}/${filename}`,
      'utf-8',
    );
  }
  const serverbundle = readMfsFile(serverCompiler, 'serverbundle.js');
  const clientManifest = JSON.parse(
    readMfsFile(clientCompiler, 'client-manifest.json'),
  );
  render({ clientManifest, serverbundle })(req, res, next);
};

module.exports = ssr;

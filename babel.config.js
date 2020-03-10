module.exports = function(api) {
  const isNode = api.caller(caller => {
    return caller.target === 'node';
  });

  const webEnvPreset = {
    targets: ['> 1%', 'last 2 versions'],
  };

  const nodePreset = {
    targets: {
      node: 'current',
    },
    modules: 'commonjs',
  };

  return {
    presets: [['@babel/preset-env', isNode ? nodePreset : webEnvPreset]],
    plugins: ['@babel/plugin-syntax-dynamic-import', '@loadable/babel-plugin'],
  };
};

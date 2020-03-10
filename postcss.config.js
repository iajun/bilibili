module.exports = {
  plugins: [
    require('postcss-cssnext')(),
    require('cssnano')(),
    require('postcss-plugin-px2rem')({
      rootValue: 40,
      unitPrecision: 2,
      mediaQuery: false,
    }),
    require('postcss-preset-env')(),
  ],
};

module.exports = {
  plugins: [
    // allow you to use css next features
    require('postcss-cssnext')(),
    // compress css
    require('cssnano')(),
    // transformation of px to rem
    require('postcss-plugin-px2rem')({
      rootValue: 40,
      unitPrecision: 2,
      mediaQuery: false,
    }),
  ],
};

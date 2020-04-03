/*
 * @Date: 2020-03-30 00:42:49
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 19:33:08
 */
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
    'block-no-empty': true,
    'declaration-colon-newline-after': 'always-multi-line',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extend', 'mixin', 'include'],
      },
    ],
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment'],
      },
    ],
    'max-nesting-depth': 2,
    'max-empty-lines': 2,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
  },
};

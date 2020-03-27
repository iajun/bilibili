module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
    'block-no-empty': false,
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
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
  },
};

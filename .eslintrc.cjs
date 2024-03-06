/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const stylistic = require('@stylistic/eslint-plugin');

const customized = stylistic.configs.customize({
  semi: true,
  jsx: false,
  arrowParens: true,
});

module.exports = {
  root: true,
  plugins: ['@stylistic'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    ...customized.rules,
    '@stylistic/array-bracket-newline': [
      'warn',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    '@stylistic/array-element-newline': [
      'warn',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    '@stylistic/object-curly-newline': [
      'warn',
      {
        multiline: true,
        minProperties: 2,
      },
    ],
    '@stylistic/object-property-newline': [
      'warn',
      { allowAllPropertiesOnSameLine: false },
    ],
  },
};

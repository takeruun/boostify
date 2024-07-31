const globals = require('globals');
const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const parser = require('@typescript-eslint/parser');

module.exports = [
  ...tseslint.configs.recommended,
  eslint.configs.recommended,
  {
    ignores: [
      'dist/**/*',
      'schema.hbs',
      'script.ts',
      'eslint.config.cjs',
      'generate-schema.ts',
      '.prettierrc.cjs',
    ],
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
      parser,
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {},
  },
  {
    files: ['src/schema/*.ts'],
    rules: {
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            '{}': false,
          },
          extendDefaults: true,
        },
      ],
      'no-useless-escape': 'off',
    },
  },
];

// ES Module eslint.config.js
// import globals from 'globals';
// import tseslint from 'typescript-eslint';
// import eslint from '@eslint/js';
// import parser from '@typescript-eslint/parser';

// export default [
//   ...tseslint.configs.recommended,
//   eslint.configs.recommended,
//   {
//     ignores: ['dist/**/*', 'script.ts', 'example'],
//   },
//   {
//     files: ['src/**/*.ts'],
//     languageOptions: {
//       globals: globals.browser,
//       parser,
//     },
//     rules: {},
//   },
// ];
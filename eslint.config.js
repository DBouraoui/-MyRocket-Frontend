import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
      'prettier': prettier
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate,
      'prettier': prettier
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/template/no-parsing-error': 'off',
      '@angular-eslint/template/accessibility-valid-aria': 'off'
    },
  }
];

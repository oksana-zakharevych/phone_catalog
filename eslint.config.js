import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['dist', 'eslint.config.js', 'vite.config.ts'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 12,
        projectService: {
          allowDefaultProject: ['*.js', '*.ts'],
        },
        projectService: true,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
  },
];

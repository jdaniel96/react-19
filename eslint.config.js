import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import reactPlugin from 'eslint-plugin-react'
import prettierConfig from 'eslint-config-prettier'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

const reactRules = {
  'react/boolean-prop-naming': ['error', { rule: '^(is|has|can|should)[A-Z]([A-Za-z0-9]?)+' }],
  'react/hook-use-state': 'error',
  'react/jsx-boolean-value': 'error',
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-no-useless-fragment': 'error',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/self-closing-comp': 'error',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }
  ]
}

const typescriptRules = {
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'inline-type-imports',
      disallowTypeAnnotations: true
    }
  ],
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }
  ],
  '@typescript-eslint/consistent-type-exports': [
    'error',
    {
      fixMixedExportsWithInlineTypeSpecifier: true
    }
  ]
}

const codeStyleRules = {
  'no-restricted-exports': [
    'error',
    {
      restrictDefaultExports: {
        direct: true,
        named: true,
        defaultFrom: false,
        namedFrom: false,
        namespaceFrom: true
      }
    }
  ],
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ExportAllDeclaration[exportKind!="type"][source.value!=/\\.types?$/]',
      message: 'Use named exports instead of export *. Only allowed for types or from .type files'
    }
  ],
  'perfectionist/sort-interfaces': ['error', {
    newlinesBetween: 'never',
  }],
  'perfectionist/sort-objects': [
    'error', {
      newlinesBetween: 'never',
    }
  ],
  'perfectionist/sort-jsx-props': ['error', {
    newlinesBetween: 'never',
  }],
  'perfectionist/sort-enums': ['error', {
    newlinesBetween: 'never',
  }],
  'perfectionist/sort-imports': ['error', {
    internalPattern: ['^@/(.*)$'],
    groups: [
      'react',
      ['builtin', 'external'],
      'internal-type',
      'internal',
      ['parent-type', 'sibling-type', 'index-type'],
      ['parent', 'sibling', 'index'],
      'object',
      'unknown',
    ],
    customGroups: {
      value: {
        react: ['^react$', '^react-.+'],
      },
      type: {
        react: ['^react$', '^react-.+'],
      }
    }
  }],
  // Auto-fix for unused imports
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_'
  }],
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'error',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_'
    }
  ]
}

const allowDefaultExportFiles = {
  files: ['**/pages/**/*', '**/main.tsx', '**/vite.config.ts'],
  rules: {
    'no-restricted-exports': 'off'
  }
}

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public', '*.config.{js,mjs,ts}']
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat['jsx-runtime'],
    languageOptions: {
      ecmaVersion: 2024,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.app.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        React: true,
        JSX: true
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': pluginJsxA11y,
      perfectionist,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      ...reactRules,
      ...typescriptRules,
      ...codeStyleRules,
      'func-style': ['error', 'expression'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    },
    settings: {
      react: {
        version: '19'
      }
    }
  },
  allowDefaultExportFiles,
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  prettierConfig
)

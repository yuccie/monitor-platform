module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    'arrow-parens': 'off',
    'valid-jsdoc': 'off',
    'eol-last': 'off',
    'array-bracket-spacing': 'off',
    'no-unused-vars': 'off',
    'no-else-return': 'off',
    strict: 'off',
    'linebreak-style': 'off',
    'no-irregular-whitespace': [
      'error',
      {
        skipComments: true
      }
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline'
      }
    ],
    'max-len': [
      'warn',
      {
        code: 120
      }
    ],
    // 定义过的变量必须使用
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none'
        // varsIgnorePattern: '^bi_params$'
      }
    ]
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jquery: true,
    es6: true
  },
  globals: {
    EASY_ENV_IS_PROD: true,
    EASY_ENV_IS_NODE: true,
    EASY_ENV_IS_BROWSER: true
  },
  plugins: ['vue'],
  parser: 'babel-eslint'
};

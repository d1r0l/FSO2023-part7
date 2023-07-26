// eslint-disable-next-line no-undef
module.exports = {
  env: {
    'browser': true,
    'es2021': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [ 'react' ],
  rules: {
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-spacing': [ 'error', { before: true, after: true } ],
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: { version: 'detect' }
  }
}

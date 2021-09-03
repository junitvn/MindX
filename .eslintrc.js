module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': ['error'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    '@typescipt-eslint/interface-name-prefix': ['always'],
    'no-underscore-dangle': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};

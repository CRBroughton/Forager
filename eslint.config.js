import antfu from '@antfu/eslint-config'

export default await antfu({
  ignores: ['dist', '**/dist/**', 'public', '**/public/**', 'coverage', '**/coverage/**', 'node_modules', '**/node_modules/**'],
  rules: {
    'no-console': 'error',
    'no-restricted-syntax': [
      'error',
      'TSEnumDeclaration',
      'ClassDeclaration',
      'Decorator',
      'TSAnyKeyword',
    ],
  },
})

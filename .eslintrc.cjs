module.exports = {
  extends: [
    'next',
    'next/typescript',
    'prettier',
    'plugin:@tanstack/query/recommended',
  ],
  plugins: ['@tanstack/query'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}

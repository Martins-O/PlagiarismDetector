module.exports = {
    env: {
        node: true,
        jest: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-var': 'error',
        'prefer-const': 'error'
    }
};
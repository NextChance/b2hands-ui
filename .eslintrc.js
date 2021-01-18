module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        '@vue/typescript',
        '@vue/prettier',
        'prettier/@typescript-eslint',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    overrides: [{
        // enable the rule specifically for TypeScript files
        files: ['*.vue'],
        rules: {
            "@typescript-eslint/explicit-function-return-type": ["error"]
        }
    }],
};

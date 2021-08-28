module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['prettier'],
    plugins: ['prettier'],
    rules: {
        'no-empty-function': 'error',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
}

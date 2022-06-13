// eslint-disable-next-line no-undef
module.exports = {
    parser: "babel-eslint",
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        "prettier",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "eslint-config-nfler"
    ],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto"
            }
        ]
    }
};

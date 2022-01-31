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
        "plugin:react-hooks/recommended"
    ],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto"
            }
        ],
        "no-undef": "error",
        "no-empty-function": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-key": "error",
        "react/require-render-return": "error",
        "react/react-in-jsx-scope": "error",
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "prefer-template": "error"
    }
};

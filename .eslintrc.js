module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
    rules: {
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 10
                },
                multiline: {
                    max: 1
                }
            }
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never'
            }
        ],
        'vue/multiline-html-element-content-newline': 'off',
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'ignore',
                multiline: 'ignore'
            }
        ]
    }
};

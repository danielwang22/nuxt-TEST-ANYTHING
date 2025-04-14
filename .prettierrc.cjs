module.exports = {
    tabWidth: 4,
    semi: true,
    bracketSpacing: true,
    printWidth: 130,
    singleQuote: true,
    trailingComma: 'none',
    overrides: [
        {
            files: '*.vue',
            options: {
                parser: 'vue'
            }
        }
    ]
};

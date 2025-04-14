// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    modules: [
        '@unocss/nuxt',
        '@nuxt/scripts',
        '@nuxt/image',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxt/content'
    ],

    css: ['./scss/style.scss', '@unocss/reset/tailwind-compat.css', '@unocss/reset/normalize.css'],

    // 內容配置
    content: {
        // 內容相關配置
    }
});

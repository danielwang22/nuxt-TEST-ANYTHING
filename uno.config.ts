/** uno.config.ts */
import { defineConfig } from 'unocss';
/** UnoCSS transformer for @apply, @screen and theme() directives */
import transformerDirectives from '@unocss/transformer-directives';
/**
 * Enables the variant group feature of Windi CSS for UnoCSS.
 * URL: https://windicss.org/features/variant-groups.html
 */
// import transformerVariantGroup from '@unocss/transformer-variant-group';

/** UnoCSS options */
export default defineConfig({
    shortcuts: {},
    rules: [['flex-0', { flex: '0 0 auto' }]],
    theme: {
        breakpoints: {
            xxs: '375px',
            sm: '640px',
            md: '768px',
            table: '992px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1400px',
            '3xl': '1536px',
            '4xl': '1920px'
        },
        container: {
            center: true,
            padding: '0rem'
        }
    },
    transformers: [transformerDirectives()]
});

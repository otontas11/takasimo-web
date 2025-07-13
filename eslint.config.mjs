// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Tüm unused vars uyarılarını kapat
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-components': 'off',

    // Vue component naming
    'vue/multi-word-component-names': 'off',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // Nuxt
    'nuxt/prefer-import-meta': 'off'
  }
})

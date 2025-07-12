// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Vue 3 Composition API için template değişkenleri
    'vue/script-setup-uses-vars': 'error',
    // Vue template'de kullanılan değişkenleri ignore et
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
})

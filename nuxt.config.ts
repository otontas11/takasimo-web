// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@pinia/nuxt'],

  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    },
    ssr: {
      noExternal: ['vuetify']
    }
  },

  typescript: {
    strict: true
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://ap1.takasimo.com/api'
    }
  },

  // SSR ayarları
  ssr: true,

  // Nitro ayarları
  nitro: {
    esbuild: {
      options: {
        target: 'es2020'
      }
    }
  },

  // Alias tanımları
  alias: {
    '@': '~/',
    '~': '~/',
    '~~': '~/',
    '@@': '~/',
    'assets': '~/assets',
    'public': '~/public'
  },

  // Experimental features
  experimental: {
    payloadExtraction: false
  }
})

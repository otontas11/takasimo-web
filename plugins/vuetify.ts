import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin({
  name: 'vuetify',
  parallel: true,
  setup(nuxtApp) {
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#8B2865',
              secondary: '#f5f5f5'
            }
          }
        }
      },
      defaults: {
        VBtn: {
          style: 'text-transform: none;'
        }
      },
      ssr: true
    })

    nuxtApp.vueApp.use(vuetify)
  }
})

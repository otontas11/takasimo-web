import { defineNuxtPlugin } from '#app'
import { createRouter, createWebHistory } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  // Remove manual router setup
  // Nuxt 3 automatically handles routing, so manual setup is not needed
  // If custom routes are needed, define them in a way that complements Nuxt's automatic routing

  // Remove the custom router setup
  // const router = createRouter({
  //   history: createWebHistory(),
  //   routes
  // })

  // nuxtApp.vueApp.use(router)

  // If you need to add custom routes, consider using middleware or other Nuxt features

  // Ensure the plugin does not interfere with Nuxt's automatic routing
  // This plugin can be used for other purposes if needed, but not for manual router setup
}) 
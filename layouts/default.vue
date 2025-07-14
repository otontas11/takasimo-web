<!-- layouts/default.vue -->
<template>
  <v-app>
    <AppHeader v-if="!isLoginPage" />
    <slot />
  </v-app>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/AppHeader.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
</script>

<style scoped>
/* Layout-specific styles */
.v-main {
  padding-top: 80px !important;
}
</style>

<!-- layouts/default.vue -->
<template>
  <v-app>
    <AppHeader />
    <v-main>
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<style scoped>
/* Layout-specific styles */
.v-main {
  padding-top: 80px !important;
}
</style>

<!-- layouts/default.vue -->
<template>
  <v-app>
    <AppHeader/>
    <slot/>

  </v-app>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/AppHeader.vue'
</script>

<style scoped>
/* Layout-specific styles */
.v-main {
  padding-top: 80px !important;
}
</style>

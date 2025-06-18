<!-- layouts/default.vue -->
<template>
  <v-app>
    <AppHeader />
    <v-main style="padding-top: 140px;" class="main-content">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

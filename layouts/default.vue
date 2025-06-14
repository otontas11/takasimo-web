<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>Takasimo</v-app-bar-title>
      <v-spacer />
      <v-btn to="/" text>Ana Sayfa</v-btn>
      <v-btn to="/about" text>Hakkımızda</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Takasimo</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
// Layout logic here
</script>

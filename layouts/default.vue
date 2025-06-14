<!-- layouts/default.vue -->
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>MyApp</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-col class="text-center">© {{ new Date().getFullYear() }} MyApp</v-col>
    </v-footer>
  </v-app>
</template>

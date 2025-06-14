<template>
  <v-card class="mx-auto" max-width="400">
    <v-img :src="image" height="200" cover />

    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <div>{{ description }}</div>
      <div class="mt-2">
        <v-chip color="primary" class="mr-2">{{ category }}</v-chip>
        <v-chip color="secondary">{{ condition }}</v-chip>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" variant="text"> Detaylar </v-btn>
      <v-spacer />
      <v-btn color="primary" variant="text"> Takas Et </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  category: string
  condition: string
}>()
</script>

<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  link: [
    { rel: 'stylesheet', href: '/assets/css/main.css' }
  ]
})
</script>

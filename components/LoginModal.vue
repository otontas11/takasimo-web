<template>
  <v-dialog :model-value="modelValue" @update:model-value="val => $emit('update:modelValue', val)" max-width="400">
    <v-card>
      <v-card-title class="headline">Giriş Yap</v-card-title>
      <v-card-text>
        <v-text-field label="E-Mail" prepend-inner-icon="mdi-email" />
        <v-text-field label="Şifre" type="password" prepend-inner-icon="mdi-lock" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="$emit('close')">Kapat</v-btn>
        <v-btn color="primary" variant="flat">Giriş Yap</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
defineEmits(['close', 'update:modelValue'])
</script> 
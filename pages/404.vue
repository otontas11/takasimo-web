<template>
  <div class="error-page">
    <v-container class="text-center">
      <v-row justify="center" align="center" style="min-height: 60vh">
        <v-col cols="12" md="6">
          <div class="error-content">
            <h1 class="display-1 font-weight-bold mb-4" style="color: #8b2865">404</h1>
            <h2 class="text-h4 mb-4">Sayfa Bulunamadı</h2>
            <p class="text-body-1 mb-6">
              Aradığınız sayfa bulunamadı. Sayfa taşınmış, silinmiş olabilir veya yanlış bir adres girmiş olabilirsiniz.
            </p>
            <div class="d-flex justify-center ga-4">
              <v-btn color="#8B2865" variant="flat" size="large" to="/" rounded="xl"> Ana Sayfaya Dön </v-btn>
              <v-btn variant="outlined" size="large" @click="$router.go(-1)" rounded="xl"> Geri Dön </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: '404 - Sayfa Bulunamadı | Takasimo',
  meta: [
    {
      name: 'description',
      content: 'Aradığınız sayfa bulunamadı. Takasimo ana sayfasına dönün.'
    }
  ]
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  max-width: 500px;
  margin: 0 auto;
}
</style>

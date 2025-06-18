<template>
  <v-footer
    app
    color="#f8f9fa"
    class="py-8"
    style="min-height: 200px;"
  >
    <v-container>
      <v-row>
        <!-- Kurumsal Section -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-4" style="color: #333;">
            Kurumsal
          </h3>
          <div class="d-flex flex-column ga-2">
            <a href="#" class="footer-link">Hakkımızda</a>
            <a href="#" class="footer-link">Takasimo Destek</a>
          </div>
        </v-col>

        <!-- Gizlilik ve Kullanım Section -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-4" style="color: #333;">
            Gizlilik ve Kullanım
          </h3>
          <div class="d-flex flex-column ga-2">
            <a href="#" class="footer-link">Güvenliğinizi önemsiyoruz</a>
            <a href="#" class="footer-link">Sözleşmeler ve kurallar</a>
            <a href="#" class="footer-link">Kişisel verilerin korunması</a>
            <a href="#" class="footer-link">Nasıl çalışır</a>
          </div>
        </v-col>

        <!-- Bizi Takip Et Section -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-4" style="color: #333;">
            Bizi Takip Et
          </h3>
          <div class="d-flex ga-3">
            <v-btn
              icon
              variant="text"
              size="large"
              href="#"
              class="social-btn"
            >
              <v-icon size="24" color="#E4405F">mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="text"
              size="large"
              href="#"
              class="social-btn"
            >
              <v-icon size="24" color="#000">mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
// Footer component logic
</script>

<style scoped>
.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.6;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #8B2865;
  text-decoration: none;
}

.social-btn {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.social-btn:hover {
  background-color: #f5f5f5;
}
</style> 
<template>
  <div class="app-footer py-8" style="min-height: 200px; width: 100%; background-color: #f8f9fa; border-top: 1px solid #e9ecef">
    <v-container style="max-width: 100%">
      <v-row style="width: 100%">
        <!-- Kurumsal Section -->
        <v-col cols="12" md="4" style="min-width: 0; flex: 0 0 auto" class="d-flex flex-column">
          <h3 class="text-h6 font-weight-bold mb-4" style="color: #333; margin-bottom: 16px; font-size: 1.125rem; line-height: 1.5">
            Kurumsal
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <a href="#" class="footer-link" style="color: #666; text-decoration: none; font-size: 0.95rem; line-height: 1.6">Hakkımızda</a>
            <a href="#" class="footer-link" style="color: #666; text-decoration: none; font-size: 0.95rem; line-height: 1.6"
              >Takasimo Destek</a
            >
          </div>
        </v-col>

        <!-- Gizlilik ve Kullanım Section -->
        <v-col cols="12" md="4" style="min-width: 0; flex: 0 0 auto" class="d-flex flex-column">
          <h3 class="text-h6 font-weight-bold mb-4" style="color: #333; margin-bottom: 16px; font-size: 1.125rem; line-height: 1.5">
            Gizlilik ve Kullanım
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <a href="#" class="footer-link" style="color: #666; text-decoration: none; font-size: 0.95rem; line-height: 1.6"
              >Güvenliğinizi önemsiyoruz</a
            >
            <a href="#" class="footer-link" style="color: #666; text-decoration: none; font-size: 0.95rem; line-height: 1.6"
              >Sözleşmeler ve kurallar</a
            >
            <a href="#" class="footer-link" style="color: #666; text-decoration: none; font-size: 0.95rem; line-height: 1.6"
              >Kişisel verilerin korunması</a
            >
            <a href="#" class="footer-link" style="color: #666; text-decoration: none; font-size: 0.95rem; line-height: 1.6"
              >Nasıl çalışır</a
            >
          </div>
        </v-col>

        <!-- Bizi Takip Et Section -->
        <v-col cols="12" md="4" style="min-width: 0; flex: 0 0 auto" class="d-flex flex-column">
          <h3 class="text-h6 font-weight-bold mb-4" style="color: #333; margin-bottom: 16px; font-size: 1.125rem; line-height: 1.5">
            Bizi Takip Et
          </h3>
          <div style="display: flex; gap: 12px; align-items: center">
            <a
              href="#"
              class="social-btn"
              style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                background-color: white;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                text-decoration: none;
                transition: background-color 0.2s;
              "
            >
              <v-icon size="24" color="#E4405F">mdi-instagram</v-icon>
            </a>
            <a
              href="#"
              class="social-btn"
              style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                background-color: white;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                text-decoration: none;
                transition: background-color 0.2s;
              "
            >
              <v-icon size="24" color="#000">mdi-twitter</v-icon>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// Footer component logic
</script>

<style scoped>
/* Footer container stabilization */
.app-footer {
  width: 100% !important;
  box-sizing: border-box !important;
  border-top: 1px solid #e9ecef;
  margin-top: 0;
}

.v-container {
  width: 100% !important;
  max-width: 100% !important;
  padding-left: 16px !important;
  padding-right: 16px !important;
}

.v-row {
  width: 100% !important;
  margin: 0 !important;
}

.v-col {
  padding: 12px !important;
}

.footer-link {
  color: #666 !important;
  text-decoration: none !important;
  font-size: 0.95rem !important;
  line-height: 1.6 !important;
  transition: color 0.2s ease !important;
  display: block !important;
}

.footer-link:hover {
  color: #8b2865 !important;
  text-decoration: none !important;
}

.social-btn:hover {
  background-color: #f5f5f5 !important;
}

/* Responsive fixes */
@media (width <= 959px) {
  .v-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}

@media (width >= 960px) {
  .v-col {
    flex: 0 0 33.333333% !important;
    max-width: 33.333333% !important;
    width: 33.333333% !important;
  }
}

/* Layout stability during loading */
.app-footer * {
  box-sizing: border-box !important;
}
</style>

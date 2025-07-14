<template>
  <v-main class="product-detail-page">
    <v-container>
      <v-row>
        <!-- Sol Kısım: Ürün Görseli ve Bilgiler -->
        <v-col cols="12" md="6" class="left-section">
          <v-img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            aspect-ratio="16/10"
            class="rounded-lg"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
            <div class="like-info">
              <v-icon color="deep-purple-accent-400">mdi-heart</v-icon>
              <span>52</span>
            </div>
          </v-img>
          <div class="meta-info d-flex align-center mt-2">
            <v-icon size="18" class="mr-1" color="grey">mdi-clock-outline</v-icon>
            <span class="mr-4 text-grey">2 gün önce güncellendi</span>
            <v-icon size="18" class="mr-1" color="grey">mdi-calendar-outline</v-icon>
            <span class="text-grey">10.01.2023</span>
          </div>
          <div class="mt-4">
            <h3 class="product-title">Dizüstü Bilgisayar</h3>
            <div class="product-location">Maltepe / İstanbul</div>
          </div>
          <div class="mt-6 d-flex justify-space-between">
            <v-btn color="primary" class="action-btn" variant="flat">Düzenle</v-btn>
            <v-btn color="primary" class="action-btn" variant="flat">Yayından kaldır</v-btn>
          </div>
        </v-col>

        <!-- Sağ Kısım: Kullanıcı ve Detaylar -->
        <v-col cols="12" md="6" class="right-section">
          <div class="user-info d-flex align-center mb-4">
            <v-avatar size="48" color="deep-purple-accent-400">
              <v-icon size="32">mdi-account</v-icon>
            </v-avatar>
            <span class="ml-3 user-name">Zeynep Tektaş</span>
          </div>
          <div class="price mb-4">12.000 TL</div>
          <v-divider class="mb-2"></v-divider>
          <div class="detail-row"><span class="label">İlan no</span><span class="value">145878</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">Konum</span><span class="value">Üsküdar / İstanbul</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">İletişim</span><span class="value">0532 000 0000</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">Marka</span><span class="value">Asus</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">Model</span><span class="value">Vivobook</span></div>
          <v-divider></v-divider>
          <div class="detail-row align-start">
            <span class="label">Açıklama</span>
            <span class="value">
              Cihaz çiziksiz, hatasızdır. Ekran koruyucu ve şarj aleti bulunmaktadır. 30.10.2025 tarihine kadar garantisi devam etmektedir.
            </span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
// Burada ileride dinamik veri çekmek için route parametreleri ve API entegrasyonu eklenebilir.
</script>

<style scoped>
.product-detail-page {
  background: #fff;
}
.left-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.right-section {
  padding-left: 32px;
}
.like-info {
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 4px 12px;
  font-size: 18px;
  color: #8d2065;
  font-weight: 500;
}
.meta-info {
  font-size: 15px;
  color: #888;
}
.product-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.product-location {
  font-size: 18px;
  color: #888;
}
.action-btn {
  min-width: 180px;
  font-size: 20px;
  font-weight: 500;
  background: #8d2065 !important;
  color: #fff !important;
  border-radius: 12px;
}
.user-info .user-name {
  font-size: 22px;
  font-weight: 600;
}
.price {
  font-size: 32px;
  font-weight: 700;
  color: #8d2065;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 18px;
}
.detail-row .label {
  font-weight: 600;
  min-width: 120px;
}
.detail-row .value {
  flex: 1;
  text-align: right;
  font-weight: 400;
  margin-left: 16px;
}
.detail-row.align-start {
  align-items: flex-start;
}
.detail-row.align-start .value {
  text-align: left;
}
</style>

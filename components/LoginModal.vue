<template>
  <v-dialog :model-value="modelValue" @update:model-value="(val) => $emit('update:modelValue', val)" max-width="400" persistent>
    <v-card class="login-modal-card">
      <v-btn icon class="close-btn" @click="$emit('update:modelValue', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text>
        <div class="text-center mb-2">
          <span class="login-logo">takasimo</span>
          <div class="login-title">Giriş Yap</div>
        </div>
        <v-form>
          <v-text-field label="E-Mail" prepend-inner-icon="mdi-email" variant="underlined" class="mb-2" color="#8B2865" />
          <v-text-field
            label="Şifre"
            type="password"
            prepend-inner-icon="mdi-lock"
            append-inner-icon="mdi-eye-off"
            variant="underlined"
            class="mb-1"
            color="#8B2865"
          />
          <div class="d-flex justify-space-between align-center mb-2">
            <v-checkbox label="Beni hatırla" hide-details density="compact" class="remember-checkbox" color="#8B2865" />
            <a href="#" class="forgot-link">Şifremi unuttum</a>
          </div>
          <v-btn block color="#8B2865" class="login-btn mb-2" size="large" rounded="xl"> Giriş yap </v-btn>
        </v-form>
        <div class="text-center mb-2">
          <span>Hesabın yok mu? <a href="#" class="register-link">Hesap oluştur</a></span>
        </div>
        <div class="divider-row">
          <div class="divider"></div>
          <span class="divider-text">veya</span>
          <div class="divider"></div>
        </div>
        <v-btn block variant="outlined" class="google-btn mb-2" color="#8B2865">
          <v-avatar size="24" class="mr-2" color="#eee">
            <v-icon color="#8B2865">mdi-account</v-icon>
          </v-avatar>
          <span>Continue as oktay</span>
          <v-icon class="ml-2" color="#8B2865">mdi-google</v-icon>
        </v-btn>
        <div class="login-terms mt-2">
          Bir hesap oluşturarak veya giriş yaparak,
          <a href="#" class="terms-link">Kullanım Koşullarını</a> ve <a href="#" class="terms-link">Gizlilik Politikasını</a> kabul etmiş
          olursunuz.
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
defineEmits(['close', 'update:modelValue'])
</script>

<style scoped>
.login-modal-card {
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgb(0 0 0 / 12%);
  background: #fff;
  padding: 2.5rem 2rem 2rem;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  color: #8b2865;
}

.login-logo {
  font-family: inherit;
  font-size: 2.2rem;
  font-weight: bold;
  color: #8b2865;
  letter-spacing: -1px;
  display: block;
  margin-bottom: 0.2rem;
}

.login-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.login-btn {
  font-weight: 600;
  font-size: 1.1rem;
  background: #8b2865 !important;
  color: #fff !important;
  box-shadow: none;
}

.google-btn {
  border-radius: 1.5rem;
  font-weight: 500;
  text-transform: none;
  background: #fff;
  border: 1px solid #8b2865;
}

.divider-row {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.divider {
  flex: 1;
  height: 1px;
  background: #e0c6d8;
}

.divider-text {
  margin: 0 1rem;
  color: #8b2865;
  font-size: 0.95rem;
}

.forgot-link,
.register-link,
.terms-link {
  color: #8b2865;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.97rem;
}

.forgot-link:hover,
.register-link:hover,
.terms-link:hover {
  text-decoration: underline;
}

.login-terms {
  color: #8b2865;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 1.2rem;
}

.remember-checkbox {
  margin-left: -8px;
}
</style>

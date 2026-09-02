<template>
  <div>
    <div v-if="!appReady" class="custom-loader-screen">
      <!-- 🔄 Your branded loading screen -->
      <div class="loader-spinner"></div>
      <p>Loading your dashboard...</p>
    </div>

    <div v-else>
      <!-- 🌟 Your app router view -->
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,watch } from 'vue'
import axios from 'axios'
import { loadCrisp } from '@/services/crisp'
import { useUserStore } from '@/stores/user'

const appReady = ref(false)
const userStore = useUserStore()

watch(
    () => userStore.shop_url,
    (shopUrl: any) => {
      if (shopUrl && !(window as any).$crisp) {
        loadCrisp({
          email: userStore.email,
          nickname: userStore.shop_owner_name,
          shop_url: userStore.shop_url,
          plan_id: userStore.plan_id,
          unique_id: String(userStore.id),
          app_name: 'QDP'
        })
      }
    },
    { immediate: true }
)

onMounted(async () => {
  // Simulate "ready" after initial token check, API calls, etc.
  setTimeout(() => {
    appReady.value = true
  }, 1000) // ✅ Replace with actual readiness logic

  const params = new URLSearchParams(window.location.search)
  const shop =
      sessionStorage.getItem('shop_url') ||
      params.get('shop')

  if (!shop) return

  try {
    const { data } = await axios.get(
        `${import.meta.env.VITE_SQL_API_BASE_URL}shopify/user-by-shop?shop=${shop}`
    )

    if (data) {
      loadCrisp(data)
    }
  } catch (e) {
    console.error('Failed to load Crisp user data')
  }
})
</script>

<style>
.custom-loader-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #bbb;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

<template>
  <div class="custom-loader-screen">
    <!-- 🔄 Your branded loading screen -->
    <div class="loader-spinner"></div>
    <p>Loading your dashboard...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAppBridge } from '@/utils/appBridge'
import { Redirect } from '@shopify/app-bridge/actions'
import AuthService from '@/services/api/auth-services'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)

  const shop = params.get('shop')
  const code = params.get('code')
  const host = params.get('host') ?? undefined

  // 🚫 Do NOT OAuth again if already embedded
  if (code && shop) {
    if (!code || !shop) {
      console.log('No OAuth code or shop — skipping')
      return
    }
    isLoading.value = true
    const res1 = await new AuthService().shopifyAddData({ code, shop, host })
    if(res1.status == 1) {
      isLoading.value = false
    }
    sessionStorage.setItem('authToken', res1.access_token)
    localStorage.setItem('authToken', res1.access_token)
    if (host) {
      sessionStorage.setItem('host', host)
      localStorage.setItem('host', host)
      userStore.host = host
    }
    userStore.shop_url = shop
    sessionStorage.setItem('shop_url', shop)
    localStorage.setItem('shop_url', shop)
    const path = !res1.plan_id ? '/plan' : '/dashboard'
    router.replace(path)
  }

  if (!shop) {
    throw new Error('Shop missing')
  }

  if(code) {
    return
  }

  // ✅ OAuth only when NOT embedded
  const res = await new AuthService().shopifyAuthLogin({ shop })

  if (res.status === 2 && res.authorize_url) {
    const app = getAppBridge(true)
    Redirect.create(app).dispatch(
        Redirect.Action.REMOTE,
        res.authorize_url
    )
  }
})
</script>

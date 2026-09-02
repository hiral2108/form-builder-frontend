<template>
  <div
      v-if="!isWix"
      class="bg-teal-50 p-6 rounded-lg mb-6 border border-solid border-teal-100 installation-incomplete-notice"
      :class="{ active: isEmbedded == 1 }">
    <div class="flex items-center gap-3.5 flex-wrap mb-3.5">
      <div class="inline-grid flex-1 min-w-52">
        <span class="font-bold mb-1.5">Installation is incomplete</span>
        <span class="font-medium">We're almost done, please add {{ appName }} to your theme</span>
      </div>
      <div class="flex justify-end">
        <a
            :href="themeEditorUrl"
            class="bg-teal-500 text-white py-2.5 px-3.5 rounded-xl text-sm border border-solid border-teal-500 flex items-center gap-1"
            target="_blank"
            @click="checkNoticeStatus">
          <span>Complete Installation</span>
          <span v-if="isChecking">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
          <svg
              v-else
              width="16"
              height="16"
              class="inline-block align-middle w-3 h-3 ml-[3px]"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1 8H15M15 8L8 1M15 8L8 15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
    <div class="bg-teal-100 text-[#3e5666] py-3.5 px-9 text-sm rounded-lg">
      <ul class="list-[square]">
        <li>Click on "Complete Installation"</li>
        <li>Make sure that the "{{ appName }}" toggle on the left sidebar is turned on</li>
        <li>Click on the "Save" button</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import UserService from "@/services/api/user-services";
import { useUserStore } from "@/stores/user";

interface Props {
  host?: string;
  appName?: string;
  extensionId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  host: "",
  appName: "",
  extensionId: "",
});

const isChecking = ref(false);
const isEmbedded = ref(0);

const userStore = useUserStore();

const isWix = computed(() => {
  const referrer = document.referrer || "";
  if (referrer.includes("wix")) return true;
  const shopUrl = userStore.shop_url || sessionStorage.getItem("shop_url") || "";
  const searchParams = new URLSearchParams(window.location.search);

  return shopUrl.includes("wix") || searchParams.has("instance");
});

const checkNoticeStatus = async () => {
  isChecking.value = true;
};

const themeEditorUrl = computed(() => {
  const params = new URLSearchParams(window.location.search);
  const rawHost =
    props.host ||
    userStore.host ||
    params.get("host") ||
    sessionStorage.getItem("host") ||
    localStorage.getItem("host") ||
    "";

  if (rawHost) {
    try {
      const decoded = rawHost.includes("admin.shopify.com") ? rawHost : atob(rawHost);
      if (decoded) {
        return `https://${decoded}/themes/current/editor?context=apps&activateAppId=${props.extensionId}/app-embed`;
      }
    } catch {
      // If atob fails, fall back to shop URL
    }
  }

  const rawShop =
    userStore.shop_url ||
    sessionStorage.getItem("shop_url") ||
    localStorage.getItem("shop_url") ||
    params.get("shop") ||
    "";

  let cleanShop = rawShop.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  if (cleanShop && !cleanShop.includes(".")) {
    cleanShop += ".myshopify.com";
  }

  if (cleanShop) {
    return `https://${cleanShop}/admin/themes/current/editor?context=apps&activateAppId=${props.extensionId}/app-embed`;
  }

  return "#";
});

// Handle window focus
const handleWindowFocus = async () => {
  if (isWix.value) return;
  try {
    const { status } = await new UserService().checkEmbededStatus();
    if (status == 1 || status == 2) {
      isChecking.value = false;
    }
    if (status) {
      isEmbedded.value = status;
    }
  } catch (err) {
    console.error("Failed to get embed status:", err);
  }
};

// Set up event listeners on mount
onMounted(() => {
  if (isWix.value) return;
  handleWindowFocus();
  window.addEventListener("focus", handleWindowFocus);
});

// Clean up event listeners on unmount
onUnmounted(() => {
  window.removeEventListener("focus", handleWindowFocus);
});
</script>

<style scoped>
.installation-incomplete-notice {
  display: none;
}
.installation-incomplete-notice.active {
  display: block;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

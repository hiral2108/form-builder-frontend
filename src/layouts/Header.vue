<template>
  <header class="h-18 bg-white flex items-center px-6 gap-4 justify-between flex-shrink-0">
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <!-- Mobile sidebar toggle trigger -->
      <button
        @click="$emit('toggle-mobile-sidebar')"
        class="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <img v-svg-inline src="@/assets/icons/settingpage/menu-line.svg" class="h-5 w-5"/>
      </button>
      
      <!-- Render the correct props here -->
      <div class="min-w-0">
        <h1 class="text-xl font-bold text-slate-800 leading-tight tracking-tight">
          {{ title }}
        </h1>
        <p class="text-sm text-slate-500 mt-0.5 hidden sm:block">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3 flex-shrink-0">

      <!-- Notifications -->
      <div class="relative">
        <button class="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
          <img 
            v-svg-inline 
            src="@/assets/icons/settingpage/notification-3-line.svg"
            class="w-5.5 h-5.5"
          />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
      </div>

      <!-- User Initials -->
      <div class="relative">
        <!-- Skeleton state shown while fetching user -->
        <div v-if="!id" class="flex items-center gap-2 px-2 py-1.5 animate-pulse">
          <div class="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
          <div class="hidden sm:block space-y-1.5">
            <div class="h-3 bg-slate-200 rounded w-16"></div>
            <div class="h-2.5 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
        
        <!-- Real loaded state -->
        <button v-else class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm">
            {{ userInitials }}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-semibold text-slate-800 leading-none">{{ name }}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">{{ email }}</p>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"> 
import { computed } from "vue";
import { useShopUser } from "@/composable/useShopUser"; // Imported composable

defineEmits(["toggle-mobile-sidebar"]);

defineProps({
  title: String,
  subtitle: String,
});

const { id, name, email } = useShopUser();

// Compute Initials dynamically from user name
const userInitials = computed(() => {
  if (!name.value) return "U";
  const parts = name.value.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
});
</script>
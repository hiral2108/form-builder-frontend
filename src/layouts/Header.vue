<template>
  <header class="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 justify-between">
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <!-- Mobile sidebar toggle trigger -->
      <button
        @click="$emit('toggle-mobile-sidebar')"
        class="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <i class="ri-menu-line text-xl"></i>
      </button>
      <div class="min-w-0">
        <h1 class="text-base font-semibold text-slate-800 leading-tight truncate">
          {{ pageTitle }}
        </h1>
        <p class="text-[10px] text-slate-400 hidden sm:block truncate">{{ pageSubtitle }}</p>
      </div>
    </div>

    <div class="flex items-center gap-3 flex-shrink-0">
      <!-- Search Input -->
      <div class="relative hidden md:block">
        <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input 
          placeholder="Search..." 
          class="w-56 pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 focus:bg-white" 
          type="text"
        />
      </div>

      <!-- Notifications -->
      <div class="relative">
        <button class="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
          <i class="ri-notification-3-line text-xl"></i>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>
      </div>

      <!-- User Initials -->
      <div class="relative">
        <button class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm">
            JD
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-semibold text-slate-800 leading-none">John Doe</p>
            <p class="text-[10px] text-slate-400 mt-0.5">john@example.com</p>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

defineEmits(["toggle-mobile-sidebar"]);

const route = useRoute();

const pageTitle = computed(() => (route.meta.title as string) || "Dashboard");
const pageSubtitle = computed(() => (route.meta.subtitle as string) || "");
</script>
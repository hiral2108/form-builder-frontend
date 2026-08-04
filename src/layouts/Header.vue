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
        <p class="text-xs text-slate-400 mt-0.5 hidden sm:block">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3 flex-shrink-0">
      <!-- Search Input -->
      <div class="relative hidden md:block">
        <img 
          v-svg-inline 
          src="@/assets/icons/settingpage/search-line.svg"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5"
        />
        <input 
          placeholder="Search..." 
          class="w-56 pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 focus:bg-white" 
          type="text"
        />
      </div>

      <!-- Notifications -->
      <div class="relative">
        <button class="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
          <img 
            v-svg-inline 
            src="@/assets/icons/settingpage/notification-3-line.svg"
            class="w-5.5 h-5.5"
          />
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
defineEmits(["toggle-mobile-sidebar"]);

defineProps({
  title: String,
  subtitle: String,
});
</script>
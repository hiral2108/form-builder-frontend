<template>
  <div class="w-full flex flex-col items-center">
    <!-- Live Preview Header Title (Above the frame) -->
    <div class="w-full max-w-lg pb-3 text-left flex-shrink-0">
      <h3 class="text-xl font-bold text-slate-800 my-0">Live Preview</h3>
    </div>

    <!-- Mockup Browser Window Frame -->
    <div 
      :class="[
        'mx-auto bg-slate-100/40 rounded-2xl border border-slate-200 relative w-full overflow-hidden transition-all duration-300 flex flex-col',
        activeDevice === 'mobile' ? 'max-w-[320px] h-[500px]' : 'w-full max-w-lg h-[500px]'
      ]"
    >
      <!-- Mockup Dots Header -->
      <div class="bg-slate-200/60 h-8 flex items-center px-4 gap-1.5 rounded-t-2xl flex-shrink-0">
        <div class="w-2 h-2 bg-red-400/90 rounded-full"></div>
        <div class="w-2 h-2 bg-yellow-400/90 rounded-full"></div>
        <div class="w-2 h-2 bg-green-400/90 rounded-full"></div>
      </div>
      
      <!-- Preview Frame Viewport -->
      <div class="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-50/10">
        <slot />
      </div>
    </div>

    <!-- Device Toggles (Centered below/after the preview frame using RadioTypeSelector) -->
    <div class="mt-4 flex justify-center">
      <RadioTypeSelector
        v-model="activeDevice"
        :options="deviceOptions"
        :columns="2"
        name="preview-device-selector"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Tracks active device: 'desktop' or 'mobile'
const activeDevice = ref("desktop");

const deviceOptions = [
  { 
    label: '<svg class="w-4.5 h-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path></svg>', 
    value: "desktop" 
  },
  { 
    label: '<svg class="w-4.5 h-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V20H17V4H7ZM6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z"></path></svg>', 
    value: "mobile" 
  }
];
</script>

<style scoped>
/* Target the checked state of RadioTypeSelector's label and color it Teal */
:deep(.custom-radio-group input[type="radio"]:checked + label) {
  color: #0d9488 !important; /* Teal theme color */
}
</style>
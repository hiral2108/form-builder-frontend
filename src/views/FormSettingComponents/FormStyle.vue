<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
    <!-- Styling sidebar -->
    <section class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <h3 class="font-bold text-slate-800 text-base mb-4 tracking-tight">Form Styling</h3>

      <!-- Theme presets -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Theme Color</label>
        <div class="flex gap-2.5">
          <button
            v-for="color in themeColors"
            :key="color.value"
            class="w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center text-white"
            :style="{ backgroundColor: color.value }"
            :class="
              color.value === '#0f766e'
                ? 'border-slate-800 scale-110 shadow-sm'
                : 'border-transparent hover:scale-105'
            ">
            <i v-if="color.value === '#0f766e'" class="ri-check-line text-xs font-bold"></i>
          </button>
        </div>
      </div>

      <!-- Border style -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Border Roundness</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="round in roundingOptions"
            :key="round.value"
            class="py-2 px-3 border text-xs font-medium rounded-lg transition-all cursor-pointer"
            :class="
              round.value === 'rounded-lg'
                ? 'border-teal-600 bg-teal-50/10 text-teal-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            ">
            {{ round.label }}
          </button>
        </div>
      </div>

      <!-- Padding density -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Form Padding</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="pad in paddingOptions"
            :key="pad.value"
            class="py-2 px-3 border text-xs font-medium rounded-lg transition-all cursor-pointer"
            :class="
              pad.value === 'p-8'
                ? 'border-teal-600 bg-teal-50/10 text-teal-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            ">
            {{ pad.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Large form preview panel -->
    <section
      class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-12 flex justify-center bg-slate-50/50">
      <div class="w-full max-w-lg bg-white border border-slate-200 shadow-xl rounded-xl p-8">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-800">Customized Form View</h2>
          <p class="text-slate-500 text-xs mt-1">This layout demonstrates styling application</p>
        </div>
        <div class="space-y-4">
          <div class="space-y-1">
            <span class="text-xs font-semibold text-slate-700">Sample Text Field</span>
            <input
              disabled
              type="text"
              placeholder="Theme color preview"
              class="w-full px-4 py-2 border border-slate-200 text-sm rounded-lg" />
          </div>
          <button
            disabled
            type="button"
            class="w-full py-3 bg-teal-700 text-white font-semibold text-sm rounded-xl">
            Submit Button
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  const themeColors = [
    { value: "#0f766e" }, // Teal
    { value: "#2563eb" }, // Blue
    { value: "#4f46e5" }, // Indigo
    { value: "#7c3aed" }, // Purple
    { value: "#ea580c" }, // Orange
    { value: "#1e293b" }, // Dark slate
  ];

  const roundingOptions = [
    { label: "Sharp", value: "rounded-none" },
    { label: "Medium", value: "rounded-lg" },
    { label: "Large", value: "rounded-2xl" },
  ];

  const paddingOptions = [
    { label: "Compact", value: "p-4" },
    { label: "Standard", value: "p-8" },
    { label: "Spacious", value: "p-12" },
  ];
</script>
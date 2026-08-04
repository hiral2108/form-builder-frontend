<template>
  <div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
    <h3 class="font-bold text-slate-800 text-base tracking-tight mb-4">Display & Targeting Rules</h3>

    <!-- Timing trigger -->
    <div class="space-y-3 pb-6 border-b border-slate-100">
      <span class="block text-sm font-semibold text-slate-700">When to display the form?</span>
      <div class="space-y-3">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="trigger" value="load" checked class="text-teal-600" />
          <span class="text-sm text-slate-600">On Page Load</span>
        </label>
        <div class="pl-6 flex items-center gap-2">
          <span class="text-xs text-slate-500">Show after</span>
          <input
            type="number"
            value="2"
            class="w-16 px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none" />
          <span class="text-xs text-slate-500">seconds</span>
        </div>

        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="trigger" value="scroll" class="text-teal-600" />
          <span class="text-sm text-slate-600">When user scrolls page</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="trigger" value="exit" class="text-teal-600" />
          <span class="text-sm text-slate-600">Exit Intent (when user tries to leave the page)</span>
        </label>
      </div>
    </div>

    <!-- Device targeting -->
    <div class="space-y-3">
      <span class="block text-sm font-semibold text-slate-700">Target Devices</span>
      <div class="grid grid-cols-3 gap-3">
        <button
          v-for="device in deviceOptions"
          :key="device.value"
          class="py-3 px-4 border text-xs font-semibold rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2"
          :class="
            device.value === 'all'
              ? 'border-teal-600 bg-teal-50/10 text-teal-700'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ">
          <i :class="device.icon" class="text-lg"></i>
          {{ device.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const deviceOptions = [
    { label: "All Devices", value: "all", icon: "ri-responsive-line" },
    { label: "Desktop Only", value: "desktop", icon: "ri-computer-line" },
    { label: "Mobile Only", value: "mobile", icon: "ri-phone-line" },
  ];
</script>
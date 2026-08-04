<template>
  <div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
    <h3 class="font-bold text-slate-800 text-base tracking-tight mb-4">Submission Settings</h3>

    <!-- Success Message -->
    <div class="space-y-2 pb-6 border-b border-slate-100">
      <label class="block text-sm font-semibold text-slate-700">Confirmation Message</label>
      <p class="text-xs text-slate-400">Shown to the user immediately after submitting the form.</p>
      <textarea
        rows="4"
        class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
      >Thank you! Your submission has been received successfully.</textarea>
    </div>

    <!-- Admin Alerts -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <span class="block text-sm font-semibold text-slate-700">Email Notifications</span>
          <p class="text-xs text-slate-400">Receive an email alert each time a user submits a form response.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer" />
          <div
            class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
      </div>

      <div class="space-y-1.5 pt-2">
        <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination Email</label>
        <input
          type="email"
          value="john@example.com"
          class="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // No scripts or states needed for this static mockup component
</script>
<template>
  <div id="root">
    <!-- Common layout container with custom modern gradient -->
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-100 to-emerald-50/50 flex items-center justify-center p-4 relative overflow-hidden">
      
      <!-- Backdrop glow blobs -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-12 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style="animation-duration: 8s;"></div>
        <div class="absolute bottom-16 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style="animation-duration: 10s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-100/20 rounded-full blur-3xl animate-pulse" style="animation-duration: 12s;"></div>
      </div>
      
      <!-- Main Content Box (centered and max width constrained) -->
      <div class="relative w-full max-w-md z-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
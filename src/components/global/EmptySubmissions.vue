<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 select-none">
    <!-- Visual Container -->
    <div class="relative w-full max-w-[420px] h-[260px] flex items-center justify-center mb-6 overflow-visible">
      
      <!-- Dotted Background Grid -->
      <div class="absolute inset-0 dot-grid opacity-40 pointer-events-none"></div>

      <!-- Teal Glow Backdrop -->
      <div class="absolute w-44 h-44 rounded-full bg-teal-50/70 blur-3xl -z-10 animate-glow"></div>

      <!-- 1. Centerpiece: Envelope and Mascot Holder -->
      <div class="relative w-[180px] h-[190px] flex flex-col items-center justify-end overflow-visible mt-6">
        
        <!-- Open Envelope Back Panel -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 110 80" 
          class="absolute bottom-2 w-32 h-24 text-slate-300 pointer-events-none z-0"
          fill="currentColor"
        >
          <path d="M5,75 L105,75 L105,25 L5,25 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2.5" />
          <path d="M5,25 L55,5 L105,25 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
        </svg>

        <!-- 2. The Cute Submission Mascot Sheet (Slides up and waves) -->
        <div class="absolute bottom-[35px] w-[95px] h-[120px] bg-white border-2 border-slate-700 rounded-xl shadow-lg p-2.5 flex flex-col justify-between z-10 animate-mascot-rise overflow-visible">
          <!-- Mascot Eyes & Happy Smile -->
          <div class="flex flex-col items-center justify-center mt-2.5 relative">
            <div class="flex gap-4">
              <!-- Left Eye (Blinking) -->
              <span class="w-2 h-2 rounded-full bg-slate-800 animate-mascot-blink"></span>
              <!-- Right Eye -->
              <span class="w-2 h-2 rounded-full bg-slate-800"></span>
            </div>
            <!-- Smiling mouth -->
            <svg viewBox="0 0 20 10" class="w-3.5 h-2 text-slate-800 mt-1.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M2,2 C6,8 14,8 18,2" />
            </svg>
          </div>

          <!-- Mid Section: Simulated form fields -->
          <div class="space-y-1.5 px-1.5 my-2">
            <div class="h-1.5 w-full bg-slate-100 rounded-full"></div>
            <div class="h-1.5 w-10 bg-slate-100 rounded-full"></div>
          </div>

          <!-- Bottom Section: Verified Checkmark Badge -->
          <div class="h-4 w-full bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" class="w-2.5 h-2.5 text-teal-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <!-- Waving Corner Hand (Top-Right corner bend) -->
          <div class="absolute -top-3.5 -right-3.5 w-9 h-9 z-25 origin-bottom-left animate-mascot-wave">
            <svg viewBox="0 0 32 32" class="w-full h-full text-amber-400 drop-shadow">
              <path fill="currentColor" d="M16,2 C12,2 10,5 10,7 C10,9 11,10 12,11 C11,12 11,13 12,14 C11,15 11,16 12,17 L12,24 C12,26 14,28 16,28 L24,28 C26,28 28,26 28,24 L28,14 C28,12 26,10 24,10 C24,8 22,6 20,6 C20,4 18,2 16,2 Z" />
            </svg>
          </div>
        </div>

        <!-- Open Envelope Front Panel (Overlaps the bottom of the mascot) -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 110 80" 
          class="absolute bottom-2 w-32 h-24 text-slate-400 pointer-events-none z-20"
          fill="currentColor"
        >
          <path d="M5,75 L55,40 L105,75 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" />
          <path d="M5,25 L45,50 L5,75 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1" />
          <path d="M105,25 L65,50 L105,75 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1" />
        </svg>

      </div>

      <!-- 3. Floating sparkles -->
      <div class="absolute top-[40px] left-[70px] text-teal-400 opacity-60 animate-float-sparkle [animation-delay:0.5s]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
          <path d="M9.813 15.904L9 21l-.813-5.096L3.096 15 8 14.187 8.813 9.096 9.813 14 15 14.813z" />
        </svg>
      </div>
      <div class="absolute bottom-[80px] right-[70px] text-amber-400 opacity-50 animate-float-sparkle [animation-delay:1.5s]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-3.5 h-3.5">
          <path d="M9.813 15.904L9 21l-.813-5.096L3.096 15 8 14.187 8.813 9.096 9.813 14 15 14.813z" />
        </svg>
      </div>

    </div>

    <!-- Text & Description -->
    <div class="text-center max-w-sm px-6">
      <h3 class="text-lg font-bold text-slate-800 mb-2">
        {{ title }}
      </h3>
      <p class="text-sm text-slate-500 leading-relaxed">
        {{ description }}
      </p>
      
      <!-- Optional Call to Action Slot -->
      <div v-if="$slots.action" class="mt-5">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Waiting for your first response',
    description: 'This form has not received any submission records yet. Share your form link with your audience to meet your first respondent!'
  }
)
</script>

<style scoped>
/* Dotted background style */
.dot-grid {
  background-image: radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px);
  background-size: 16px 16px;
}

/* Mascot Sheet sliding up from envelope */
@keyframes mascot-rise {
  0%, 100% {
    transform: translateY(15px) scale(0.95);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
}

/* Waving Hand/Corner bend animation */
@keyframes mascot-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  20%, 60% {
    transform: rotate(-10deg);
  }
  40%, 80% {
    transform: rotate(15deg);
  }
}

/* Blinking eyes animation */
@keyframes mascot-blink {
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
}

/* Float Sparkles */
@keyframes float-sparkle {
  0%, 100% {
    transform: translateY(0px) scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
    opacity: 0.8;
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.08);
  }
}

.animate-mascot-rise {
  animation: mascot-rise 5s ease-in-out infinite;
}

.animate-mascot-wave {
  animation: mascot-wave 2s ease-in-out infinite;
}

.animate-mascot-blink {
  animation: mascot-blink 4.5s ease-in-out infinite;
}

.animate-float-sparkle {
  animation: float-sparkle 4s ease-in-out infinite;
}

.animate-glow {
  animation: glow 4.5s ease-in-out infinite;
}
</style>
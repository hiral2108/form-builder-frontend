<template>
  <div v-if="isShowModal" class="fixed inset-0 z-[99999] flex items-center justify-center p-4">
    <!-- Backdrop overlay with blur effect -->
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModalWidget"></div>

    <!-- Modal Card with a fresh teal-themed design and min height -->
    <div class="relative bg-white rounded-[30px] shadow-2xl w-full max-w-[460px] p-6 transform transition-all flex flex-col items-center z-10 border border-slate-100 justify-between">
      
      <!-- Floating Top Badge with Teal/Emerald Gradient -->
      <div class="absolute -top-10 w-20 h-20 rounded-full flex items-center justify-center z-20">
        <!-- Inner gradient badge with leaf/seedling icon representing "Starter" -->
        <div class="w-18 h-18 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center shadow-inner">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      <!-- Close button -->
      <button 
        type="button" 
        @click="closeModalWidget" 
        class="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Content Header -->
      <div class="w-full text-center mt-6">
        <h3 class="text-2xl font-extrabold text-slate-800 tracking-tight leading-snug">
          Starter Plan Activated!
        </h3>
        <p class="text-slate-400 text-sm mt-3 px-1 leading-relaxed font-medium">
          Your account is now on the Free Starter plan. Explore the active quotas for your workspace:
        </p>
      </div>

      <!-- Feature Card Container with Local Scroll inside features list -->
      <div class="w-full bg-[#f4fbf9] border border-teal-50 rounded-2xl p-6 mt-6 space-y-4 shadow-sm shadow-teal-500/5 max-h-[45vh] overflow-y-auto">
        <div v-for="(feature, idx) in freeFeatures" :key="idx" class="flex items-center gap-3.5">
          <!-- Premium mint circle checkmark -->
          <div class="w-6 h-6 rounded-full bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span class="text-slate-700 font-semibold text-sm leading-none mt-0.5">{{ feature }}</span>
        </div>
      </div>

      <!-- Go to Dashboard Action Button matching main brand color -->
      <button
        type="button"
        @click="confirmFreePlan"
        class="w-full mt-7 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg shadow-teal-600/10 hover:shadow-teal-600/25 cursor-pointer flex items-center justify-center"
      >
        Go to Dashboard
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(["closeModal", "confirmSelection"]);

const freeFeatures = [
  "1 Active Form",
  "1,000 Visitors / month",
  "50 Submissions / month",
  "Basic Form Customizations",
  "Up to 8 Form Fields",
];

const closeModalWidget = () => {
  emit("closeModal");
};

const confirmFreePlan = () => {
  emit("confirmSelection");
  closeModalWidget();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isShowModal) {
    closeModalWidget();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
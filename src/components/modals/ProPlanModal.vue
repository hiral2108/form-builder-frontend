<template>
  <div v-if="isShowModal" class="fixed inset-0 z-[99999] flex items-center justify-center p-4">
    <!-- Backdrop overlay with blur effect -->
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModalWidget"></div>

    <!-- Modal Card with rounded corners and scroll wrapper -->
    <div 
      class="relative bg-white flex flex-col w-full max-w-md max-h-[85vh] rounded-[24px] border border-gray-100 shadow-2xl overflow-visible mt-7 z-10"
      @click.stop
    >
      <!-- Floating Top Badge with Gold Crown Icon -->
      <div class="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-amber-50 border-4 border-white text-amber-500 rounded-full flex items-center justify-center shadow-md z-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="text-amber-500 w-6.5 h-6.5">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14a1 1 0 001-1v-1H4v1a1 1 0 001 1z" />
        </svg>
      </div>

      <!-- Close Button -->
      <div class="absolute top-5 right-5 z-10">
        <button 
          type="button"
          class="close-modal text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer" 
          @click="closeModalWidget"
        >
          <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.578 8.81667L14.6968 4.7L15.8807 5.88334L11.762 10L15.8807 14.1167L14.6968 15.3L10.578 11.1833L6.45932 15.3L5.27539 14.1167L9.39412 10L5.27539 5.88334L6.45932 4.7L10.578 8.81667Z"
              fill="currentColor" />
          </svg>
        </button>
      </div>

      <!-- Content Header -->
      <div class="px-6 pt-10 pb-4 shrink-0 bg-white rounded-t-[24px]">
        <div class="flex flex-col items-center text-center">
          <h3 class="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Pro Plan Activated!</h3>
          <p class="text-sm font-semibold text-gray-400 text-center px-4">Congratulations! Your premium account is now active.</p>
        </div>
      </div>

      <!-- Main container handles the scroll and height limit (min-h-0 prevents overflow) -->
      <div class="px-6 py-2 overflow-y-auto grow bg-white min-h-0 max-h-[40vh] scrollbar-thin">
        <div class="w-full space-y-4 py-4 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <div v-for="(item, index) in proFeatures" :key="index" class="flex items-center gap-3">
            <!-- Checked Circle Icon in Teal -->
            <div class="w-6 h-6 rounded-full bg-teal-100 text-teal-500 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-teal-600 stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p class="text-gray-600 text-left text-sm font-semibold">
              {{ item.feature }}
            </p>
          </div>
        </div>
      </div>

      <!-- Go to Dashboard Action Button in Teal -->
      <div class="px-6 pb-6 pt-4 border-t border-gray-100/60 shrink-0 bg-white rounded-b-[24px]">
        <button
          type="button"
          @click="confirmProPlan"
          class="w-full block text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-3.5 px-6 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap shadow-md shadow-teal-500/10"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from "vue";
import planFeatures from "@/data/planFeatures.json";

const props = defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(["closeModal", "confirmSelection"]);

// Dynamically list all features belonging to the Pro tier
const proFeatures = computed(() => {
  return planFeatures.PlanFeature.pro;
});

const closeModalWidget = () => {
  emit("closeModal");
};

const confirmProPlan = () => {
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
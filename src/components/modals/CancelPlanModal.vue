<template>
  <div v-if="isShowModal" class="popup-modal" @keydown.esc="closeModalWidget">
    <div
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[10009]"
      @click="closeModalWidget"
    >
      <div 
        class="bg-white relative flex flex-col w-full max-w-md max-h-[85vh] rounded-[24px] border border-gray-100 shadow-2xl overflow-visible mt-7 z-10"
        @click.stop
      >
        <!-- Floating Top Badge with Red Warning Triangle Icon -->
        <div class="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-red-50 border-4 border-white text-red-500 rounded-full flex items-center justify-center shadow-md z-20">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap-round stroke-linejoin-round class="text-red-500">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <path d="M12 8v6" />
            <path d="M12 16v1.5" />
          </svg>
        </div>

        <!-- Close Button -->
        <div class="absolute top-5 right-5 z-10">
          <button class="close-modal text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer" @click="closeModalWidget">
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
            <h3 class="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Upgrade Not Completed</h3>
            <p class="text-sm font-semibold text-gray-400 text-center px-4">We couldn't process your plan selection. This might be due to:</p>
          </div>
        </div>

        <!-- Main container handles the reasons list and help box -->
        <div class="px-6 py-2 overflow-y-auto grow bg-white min-h-0 max-h-[40vh] scrollbar-thin text-left">
          <!-- Reasons List -->
          <div class="w-full space-y-4 py-4 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] border border-slate-50">
            <div v-for="(reason, index) in declineReasons" :key="index" class="flex items-center gap-3">
              <!-- Red Cross Circle Icon -->
              <div class="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap-round stroke-linejoin-round class="stroke-red-500">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <p class="text-gray-600 text-sm font-semibold leading-none">
                {{ reason }}
              </p>
            </div>
          </div>

          <!-- Help Box Card -->
          <div class="w-full bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex gap-3.5 mt-5">
            <div class="w-8 h-8 rounded-full bg-slate-200/70 text-slate-500 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap-round stroke-linejoin-round>
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div class="flex flex-col justify-center">
              <p class="text-sm font-bold text-gray-900 leading-snug">Need Help?</p>
              <p class="text-xs font-semibold text-gray-400 mt-1 leading-relaxed">
                Our support team is here to assist you with the plan update process.
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 pb-6 pt-4 border-t border-gray-100/60 shrink-0 bg-white rounded-b-[24px]">
          <button
            type="button"
            @click="closeModalWidget"
            class="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl cursor-pointer transition-colors shadow-md shadow-slate-900/10 whitespace-nowrap text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(["closeModal"]);

const declineReasons = [
  "Payment method declined",
  "Insufficient funds",
  "Transaction cancelled"
];

const closeModalWidget = () => {
  emit("closeModal");
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
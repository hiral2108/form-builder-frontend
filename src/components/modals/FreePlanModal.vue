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
        <!-- Floating Top Badge with Teal Double Checkmark -->
        <div class="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-teal-50 border-4 border-white text-teal-600 rounded-full flex items-center justify-center shadow-md z-20">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-teal-600 stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
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
            <h3 class="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Free Plan Activated!</h3>
            <p class="text-sm font-semibold text-gray-400">Your account is now active on the Free Plan.</p>
          </div>
        </div>

        <!-- Main container now handles the scroll and height constraint -->
        <div class="px-6 py-2 overflow-y-auto grow bg-white min-h-0 max-h-[40vh] scrollbar-thin">
          <div class="w-full space-y-4 py-4 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
            <div v-for="(item, index) in freePlanFeatures" :key="index" class="flex items-center gap-3">
              <!-- Checked Circle Icon in Teal -->
              <div class="w-6 h-6 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
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
            @click="confirmFreePlan"
            class="w-full block text-center bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-3.5 px-6 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap shadow-md shadow-teal-500/10"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, computed } from "vue";
  import planFeatures from "@/data/planFeatures.json";
  import { useRouter } from "vue-router";

  defineProps({
    isShowModal: Boolean,
  });

  const emit = defineEmits(["closeModal", "confirmSelection"]);
  const router = useRouter();

  // Dynamically filter features that belong to the free tier and are not pro features
  const freePlanFeatures = computed(() => {
    return planFeatures.PlanFeature.free.filter((item) => !item.is_pro);
  });

  const closeModalWidget = () => {
    emit("closeModal");
  };

  const confirmFreePlan = () => {
    emit("confirmSelection");
    closeModalWidget();
    router.push("/dashboard");
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
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
<template>
  <div v-if="isDeleteModalOpen" class="qcb-modal" id="delete-single-lead" @keydown.esc="$emit('close')">
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 z-[11111] qcb-modal-overlay" @click="!isDeleting && $emit('close')">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all qcb-modal-content">
        <div class="px-6 py-5 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6111 3.5H13.5268V4.66667H12.3605V12.25C12.3605 12.4133 12.3041 12.5514 12.1914 12.6642C12.0787 12.7769 11.9407 12.8333 11.7774 12.8333H3.61363C3.45036 12.8333 3.31235 12.7769 3.19961 12.6642C3.08688 12.5514 3.03051 12.4133 3.03051 12.25V4.66667H1.86426V3.5H4.77988V1.75C4.77988 1.58667 4.83625 1.44861 4.94899 1.33583C5.06173 1.22305 5.19973 1.16667 5.36301 1.16667H10.028C10.1913 1.16667 10.3293 1.22305 10.442 1.33583C10.5548 1.44861 10.6111 1.58667 10.6111 1.75V3.5ZM11.1943 4.66667H4.19676V11.6667H11.1943V4.66667ZM5.94613 6.41667H7.11238V9.91667H5.94613V6.41667ZM8.27863 6.41667H9.44488V9.91667H8.27863V6.41667ZM5.94613 2.33333V3.5H9.44488V2.33333H5.94613Z" fill="#DC2626"></path></svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 m-0!">Delete Lead</h3>
              <p class="text-sm text-gray-500 m-0!">This action cannot be undone</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-6">
          <div class="text-center">
            <div>
              <p class="text-gray-800 font-medium mb-2! mt-0! text-base!">Are you sure you want to delete this lead?</p>
              <p class="text-sm! text-gray-500 my-0!">This lead settings will be permanently removed from your account.</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3">
          <button type="button" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium! text-base! transition-colors whitespace-nowrap cursor-pointer border border-solid border-gray-300 rounded-lg bg-white" @click="$emit('close')">
            Cancel
          </button>
          <button type="button" class="px-6 py-2 bg-red-600 text-white rounded-lg font-medium! text-base! hover:bg-red-700 transition-all whitespace-nowrap cursor-pointer disabled:opacity-60" :disabled="isDeleting" @click="$emit('confirm')">
            {{ isDeleting ? "Deleting..." : "Delete Lead" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue'

defineProps<{
  isDeleteModalOpen: boolean;
  deleteLeadId: any;
  selectedLeadIds: any[];
  isDeleting: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

const handleKeydown = (event: KeyboardEvent) => {
  if(event.key === "Escape") {
    emit("close");
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
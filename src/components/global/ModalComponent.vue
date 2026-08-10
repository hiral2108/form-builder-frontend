<template>
  <div class="form-modal" :class="{hidden: !isShowModal}" @keydown.esc="closeModalWidget">
    <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 z-[11111] form-modal-overlay" @click="onBackDropClick">
      <div class="bg-white rounded-2xl shadow-2xl w-full mx-4 transform transition-all form-modal-content" :class="modalClasses || 'max-w-md'" @click.stop>
        <div class="px-6 py-5 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="[headerIconClasses || 'bg-teal-50 text-teal-600']" v-if="headerIcon">
              <span v-html="headerIcon"></span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-800 m-0! leading-snug">{{ headerTitle }}</h3>
              <p class="text-xs text-slate-400 m-0! mt-0.5 leading-normal">{{ headerSubTitle }}</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-6">
          <slot />
        </div>
        <div v-if="actionButtonTypeOneText || actionButtonTypeTwoText" class="px-6 py-4 bg-slate-50/50 rounded-b-2xl flex items-center justify-end gap-3 border-t border-slate-100/50">
          <button type="button"
                  v-if="actionButtonTypeOneText"
                  class="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer border border-solid border-slate-200 rounded-lg bg-white modal-close-button hover:bg-slate-50"
                  @click="ButtonOneAction">
            {{ actionButtonTypeOneText }}
          </button>
          <button type="button"
            v-if="actionButtonTypeTwoText"
            @click="ButtonTwoAction"
            class="flex items-center gap-2 px-5 py-2 text-white rounded-lg font-semibold text-sm disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all whitespace-nowrap cursor-pointer modal-submit-btn"
            :class="[actionButtonTypeTwoClasses || 'bg-teal-600 hover:bg-teal-700']"
            :disabled="isLoading">
            <span>{{ actionButtonTypeTwoText }}</span>
            <ButtonLoader v-if="isLoading && isShowLoader" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    isShowModal: boolean
    closeModal?: boolean
    headerIcon?: string
    headerIconClasses?: string
    headerIconAlt?: string
    headerTitle?: string
    headerSubTitle?: string
    isLoading?: boolean
    isShowLoader?: boolean
    isShowActionButtons?: boolean
    actionButtonTypeOneText?: string
    actionButtonTypeTwoText?: string
    actionButtonTypeTwoClasses?: string
    backdropClickClose?: boolean
    modalClasses?: string
  }>(),
  {
    isShowModal: false,
    headerIcon: '',
    headerIconClasses: '',
    headerIconAlt: '',
    headerTitle: '',
    headerSubTitle: '',
    actionButtonTypeOneText: '',
    actionButtonTypeTwoText: '',
    actionButtonTypeTwoClasses: '',
    backdropClickClose: true,
    closeModal: true,
    modalClasses: ''
  }
)

const emit = defineEmits(['closeModal', 'ButtonOneAction', 'ButtonTwoAction']);

const ButtonOneAction = () => {
  emit('ButtonOneAction');
}

const ButtonTwoAction = () => {
  emit('ButtonTwoAction');
}

const closeModalWidget = () => {
  if(props.closeModal) {
    emit('closeModal')
  }
}

const onBackDropClick = (event: MouseEvent) => {
  if (props.closeModal && props.backdropClickClose && event.target === event.currentTarget) {
    emit('closeModal')
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if(event.key === "Escape") {
    closeModalWidget()
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
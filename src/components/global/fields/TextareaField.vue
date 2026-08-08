<template>
  <div>
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-semibold text-gray-700 mb-1"
      :class="labelClass"
      :style="labelStyle"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Textarea -->
    <textarea
      ref="textareaRef"
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      class="block w-full bg-transparent border placeholder-gray-400
            py-1 px-3 text-[#2c3338]
            border-gray-300 focus:border-transparent
            rounded-xl text-sm
            outline-none focus:outline-none
            focus:ring-2 focus:ring-teal-500"
      :class="textareaClass"
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'

// Define a template ref to link to the textarea element
const textareaRef = ref<HTMLTextAreaElement | null>(null);
// Expose the focus function so parent components can call it
defineExpose({
  focus: () => {
    textareaRef.value?.focus();
  }
});

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `textarea-${uuidv4()}`
  },
  rows: {
    type: Number,
    default: 5
  },
  textareaClass: {
    type: String,
    default: 'h-30'
  },
  required: {
    type: Boolean,
    default: false
  },
  labelStyle: {
  type: Object,
  default: () => ({})
}
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

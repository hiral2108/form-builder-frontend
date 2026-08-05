<template>
  <div>
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-semibold text-gray-700 mb-1"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Textarea -->
    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      class="block w-full bg-transparent outline-none border placeholder-gray-400
             py-1 px-3 text-[#2c3338]
             border-gray-200 hover:border-gray-300
             rounded-xl focus:shadow-none
             text-sm"
      :class="textareaClass"
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
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
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

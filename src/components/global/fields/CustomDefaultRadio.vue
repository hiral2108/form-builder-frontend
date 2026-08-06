<template>
  <div class="discount-type-radio-toggle">
    <input
      type="radio"
      class="sr-only peer"
      :id="id"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="updateValue"
    />

    <label
      :for="id"
      class="flex items-center gap-2.5 cursor-pointer rounded-md px-3 py-0.5 transition-all"
    >
      <!-- Radio Circle -->
      <span
        class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
         :class="isChecked ? 'border-blue-500 bg-white' : 'border-gray-300'"
      >
      <span
        class="w-1.5 h-1.5 rounded-full"
        :class="isChecked ? 'bg-blue-500' : 'bg-gray-300'"
      ></span>
      </span>

      <!-- Label text -->
      <span class="text-sm text-gray-700" v-if="label">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    required: false,
    default: null
  },
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  id: {
    type: String,
    required: true
  }
})

const isChecked = computed(() => props.modelValue === props.value)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function updateValue() {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <div>
    <!-- Optional Label with dynamic class support -->
    <label
      v-if="label"
      :class="labelClass"
    >
      {{ label }}
    </label>

    <div class="bg-[#f0f0f1] rounded-md p-1 w-full sm:w-fit">
      <!-- Dynamic grid columns using style binding to prevent Tailwind purging -->
      <div
        class="grid gap-2"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="custom-radio-group"
        >
          <input
            type="radio"
            class="sr-only"
            :id="id ? `${option.value}_${id}` : `${name}_${option.value}`"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="updateValue(option.value)"
            :disabled="option.disabled"
          />

          <!-- Updated to flex centered layout to guarantee perfect alignment -->
          <label
            :for="id ? `${option.value}_${id}` : `${name}_${option.value}`"
            role="radio"
            class="flex items-center justify-center w-full rounded-md py-1.5 px-2.5 cursor-pointer transition
                   text-gray-700 hover:bg-white h-full whitespace-nowrap text-sm
                   disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{
              'opacity-50 cursor-not-allowed': option.disabled
            }"
          >
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface RadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

defineProps({
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    required: true
  },
  options: {
    type: Array as PropType<RadioOption[]>,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: 'block text-sm font-semibold text-gray-700 mb-1'
  },
  name: {
    type: String,
    default: 'radio-group'
  },
  columns: {
    type: Number,
    default: 2
  },
  id: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function updateValue(value: string | number) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.custom-radio-group input[type="radio"]:checked + label {
  background-color: #ffffff;
}
</style>
<template>
  <div class="flex items-center gap-2">
    <label class="flex items-center gap-3 cursor-pointer group w-fit">
      <!-- Checkbox -->
      <input
        type="checkbox"
        class="sr-only peer"
        :checked="isChecked"
        @change="onChange"
        :disabled="disabled"
      />

      <!-- Custom box -->
      <div
        class="w-5 h-5 border-2 rounded flex items-center justify-center transition-all flex-[0_0_20px]
               border-gray-300
               peer-checked:bg-blue-500 peer-checked:border-blue-500
               peer-disabled:cursor-not-allowed peer-disabled:bg-gray-300 peer-disabled:border-gray-300"
      >
        <svg
          v-if="isChecked"
          width="18"
          height="18"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.05291 8.85505L11.4177 3.48839L12.234 4.31672L6.05291 10.5117L2.34424 6.79005L3.16061 5.97339L6.05291 8.85505Z"
            fill="white"
          />
        </svg>
      </div>

      <!-- Label -->
      <span class="text-sm font-medium text-gray-700" v-if="label">
        {{ label }}
      </span>
    </label>

    <!-- Tooltip -->
    <div v-if="tooltip" class="relative group/tooltip max-[426px]:hidden">
      <img v-svg-inline src="@/assets/icons/form-settings/info.svg" alt="Info Tooltip">

      <div
        class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2
           bg-gray-900 text-white text-xs px-3 py-2 rounded-lg
           opacity-0 group-hover/tooltip:opacity-100 transition-opacity
           max-w-[220px] w-max
           whitespace-normal break-words
           pointer-events-none z-20"
      >
        {{ tooltip }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number],
    required: true
  },
  trueValue: {
    type: [Boolean, String, Number],
    default: true
  },
  falseValue: {
    type: [Boolean, String, Number],
    default: false
  },
  label: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | string | number): void
}>()

/**
 * Determine checked state
 */
const isChecked = computed(() => {
  return props.modelValue === props.trueValue
})

/**
 * Emit correct value on change
 */
function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked ? props.trueValue : props.falseValue)
}
</script>

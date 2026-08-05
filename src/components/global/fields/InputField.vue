<template>
  <div class="input-field">
    <div class="input-wrapper">
      <label v-if="label" :for="getFieldID" :class="labelClass" class="block text-sm font-semibold text-gray-700 mb-1">{{ label }}</label>
      <div class="relative">
              <input
        :disabled="disable"
        :value="modelValue"
        :type="type"
        :id="getFieldID"
        :readonly="readonly"
        :autofocus="autofocus"
        autocomplete="off"
        :maxlength="maxlength"
        :class="[
          {
            'border-red-500 bg-red-50': hasError,
            rtl: isRTL(String(modelValue)),
            'focus:ring-blue-500': !focusColor || focusColor === 'blue',
            'focus:ring-teal-500': focusColor === 'teal',
            'focus:ring-emerald-500': focusColor === 'emerald',
            'focus:ring-red-500': focusColor === 'red'
          },
          classes
        ]"
        ref="inputField"
        class="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white"
        :placeholder="placeholder"
        @input="onChange"
        @blur="onBlur"
        @focusin="focusInHandler"
        @keydown="$emit('keydown', $event)"
        @focusout="focusOutHandler"
      />
      </div>
        <div v-for="(error, index) in validationMessage" :key="index">
        <span v-if="index == 0" class="text-red-700 text-sm">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { isRTL } from '@/utils'
import { v4 as uuidv4 } from 'uuid'

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'togglePassword', 'focusin', 'keydown', 'focusout'])

const props = withDefaults(
  defineProps<{
    label?: string
    labelClass?: string
    value?: string | number
    modelValue?: string | number
    type: string
    hasError?: boolean
    fieldId?: string
    placeholder?: string
    readonly?: boolean
    validationMessage?: { $message: string }[] | any
    classes?: string
    tooltip?: string
    disable?: boolean
    autofocus?: boolean
    maxlength?: number
    vModel?: string | any
    focusColor?: 'blue' | 'teal' | 'emerald' | 'red' // Added prop type
  }>(),
  {
    type: 'text',
    placeholder: '',
    readonly: false,
    hasIcon: false,
    disable: false,
    focusColor: 'blue' // Added default fallback
  }
)

const getFieldID = computed(() => props?.fieldId || `input-${uuidv4()}`)
const inputField = ref<HTMLInputElement | null>()

const isFocused = ref(false)

const focusInHandler = () => {
  isFocused.value = true
  emit('focusin')
}

const focusOutHandler = () => {
  isFocused.value = false
  emit('focusout')
}

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('input', target.value)
  emit('update:modelValue', target.value)
}

const onBlur = () => {
  emit('blur')
}

defineExpose({
  focus: () => {
    inputField.value?.focus()
  }
})
</script>

<style scoped>

</style>
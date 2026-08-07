<template>
  <div>
    <label v-if="label && labelPosition === 'top'" :for="id" class="block text-sm font-semibold text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      :class="[
        'flex items-center h-[38px] gap-1 bg-white rounded-xl px-4 py-2 border border-gray-300 outline-none transition-all duration-200 focus-within:border-transparent focus-within:ring-2 focus-within:ring-teal-500',
        widthClass,
        classes,
      ]">
      <input
        ref="inputRef"
        :id="id"
        :name="name"
        :type="type"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        class="bg-transparent outline-none border-none min-h-0 p-0 focus:shadow-none w-full text-xs text-slate-800 placeholder-slate-400"
        :value="modelValue"
        @input="handleInput"
        @keydown="handleKeydown" />

      <span class="text-xs text-slate-500 font-medium select-none flex items-center" v-if="badge" v-html="badge"></span>
    </div>

    <label v-if="label && labelPosition === 'bottom'" :for="id" class="block text-xs text-slate-500 mt-1 text-center">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { v4 as uuidv4 } from "uuid";

  // Template ref linking to the HTML input element
  const inputRef = ref<HTMLInputElement | null>(null);

  // Expose the focus function to parent components
  defineExpose({
    focus: () => {
      inputRef.value?.focus();
    },
  });

  const props = withDefaults(
    defineProps<{
      label?: string;
      name?: string;
      modelValue?: string | number;
      placeholder?: string;
      badge?: string;
      type?: "text" | "number";
      min?: number;
      max?: number;
      classes?: string;
      width?: "fit" | "full" | string;
      labelPosition?: "top" | "bottom";
      id?: string;
      emptyFallback?: number;
    }>(),
    {
      type: "text",
      width: "fit",
      labelPosition: "top",
    }
  );

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();

  const widthClass = computed(() => {
    if (props.width === "fit") return "w-fit";
    if (props.width === "full") return "w-full";
    return props.width;
  });

  const id = computed(() => props?.id || `input-badge-${uuidv4()}`);

  // const handleKeydown = (e: KeyboardEvent) => {
  //   if (props.type === 'number' && ['-', 'e', 'E', '+'].includes(e.key)) e.preventDefault();
  // };

  // const handleInput = (e: Event) => {
  //   const target = e.target as HTMLInputElement;
  //   let value: string | number = target.value;

  //   if (props.type === 'number') {
  //     if (value === '') {
  //       if (props.emptyFallback !== undefined) {
  //         value = props.emptyFallback;
  //         target.value = String(props.emptyFallback);
  //       } else {
  //         emit('update:modelValue', '');
  //         return;
  //       }
  //     }
  //     let num = parseFloat(String(value));
  //     if (isNaN(num)) num = props.min ?? 0;
  //     if (props.min !== undefined && num < props.min) num = props.min;
  //     if (props.max !== undefined && num > props.max) num = props.max;
  //     value = num;
  //     target.value = String(num);
  //   }

  //   emit('update:modelValue', value);
  // };

  const handleKeydown = (e: KeyboardEvent) => {
    if (props.type === "number") {
      // 1. Prevent 'e', 'E', and '+' keys
      if (["e", "E", "+"].includes(e.key)) {
        e.preventDefault();
      }
      // 2. Prevent '-' ONLY if min is defined and is greater than or equal to 0 (positive)
      if (e.key === "-" && props.min !== undefined && props.min >= 0) {
        e.preventDefault();
      }
    }
  };

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let value: string | number = target.value;

  if (props.type === "number") {
    // 1. If the user typed a minus sign, allow it as a temporary state (only for negative/undefined min)
    if (value === "-") {
      if (props.min === undefined || props.min < 0) {
        emit("update:modelValue", value);
        return;
      } else {
        // If min is positive, a minus sign is invalid. Fallback to min.
        const fallbackValue = props.emptyFallback !== undefined ? props.emptyFallback : (props.min ?? 0);
        value = fallbackValue;
        target.value = String(fallbackValue);
      }
    }
    
    // 2. If the user cleared/removed the entire field (making it empty "")
    else if (value === "") {
      if (props.min === undefined) {
        // If no minimum limit is set, allow it to be empty
        emit("update:modelValue", "");
        return;
      } else {
        // Determine the fallback value when cleared:
        // - For positive min fields: fallback to the positive min value (e.g. 1)
        // - For negative min fields: fallback to 0
        let fallbackValue = 0;
        if (props.min >= 0) {
          fallbackValue = props.min;
        }

        // If a custom emptyFallback is provided, respect it
        if (props.emptyFallback !== undefined) {
          fallbackValue = props.emptyFallback;
        }

        value = fallbackValue;
        target.value = String(fallbackValue);
      }
    } 
    
    // 3. For any other numerical inputs
    else {
      let num = parseFloat(String(value));

      if (isNaN(num)) {
        emit("update:modelValue", value);
        return;
      }

      // Apply min/max limits
      if (props.min !== undefined && num < props.min) num = props.min;
      if (props.max !== undefined && num > props.max) num = props.max;

      value = num;
      target.value = String(num);
    }
  }

  emit("update:modelValue", value);
};
</script>

<style scoped>
  /* Hide number input arrows in all browsers */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield !important;
  }
</style>

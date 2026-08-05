<template>
  <label :for="id" class="relative inline-flex items-center gap-1.5 cursor-pointer">
    <input
      :id="id"
      class="sr-only peer"
      type="checkbox"
      :checked="isChecked"
      @change="onChange"
      :aria-checked="isChecked"
      :aria-label="ariaLabel"
    />

    <!-- visual track + thumb (Styled in Teal-700 / Slate-200) -->
    <span
      class="w-11 h-6 peer-focus:outline-none rounded-full relative inline-block transition-colors flex-[0_0_44px]"
      :class="isChecked ? 'bg-teal-700' : 'bg-slate-200'"
    >
      <span
        class="absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform"
        :style="{ transform: isChecked ? 'translateX(20px)' : 'translateX(0)' }"
      />
    </span>

    <!-- label text -->
    <span v-if="label" class="text-sm font-semibold text-gray-700" :class="labelClasses">{{ label }}</span>

    <!-- default slot for custom label/content -->
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { v4 as uuidv4 } from "uuid";

type Value = string | number | boolean | undefined;

const props = withDefaults(defineProps<{
  modelValue?: Value;
  trueValue?: Value;
  falseValue?: Value;
  label?: string;
  id?: string;
  ariaLabel?: string;
  labelClasses?: string
}>(), {
  trueValue: true,
  falseValue: false,
  ariaLabel: undefined
});

const emit = defineEmits<{
  (e: "update:modelValue", v: Value): void;
}>();

const id = computed(() => props.id ?? `checkbox-toggle-${uuidv4()}`);

// whether the control is checked (derived from modelValue + trueValue)
const isChecked = computed(() => {
  return props.modelValue === props.trueValue;
});

function onChange(e: Event) {
  const input = e.currentTarget as HTMLInputElement | null;
  if (!input) return;

  const next = input.checked ? props.trueValue : props.falseValue;
  emit("update:modelValue", next);
}
</script>
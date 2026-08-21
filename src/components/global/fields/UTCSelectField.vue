<!-- UTCSelectField.vue -->
<template>
  <Listbox v-model="selectedValue">
    <div class="relative">
      <!-- Dropdown Button -->
      <ListboxButton class="border cursor-pointer border-solid! border-gray-300 bg-white w-full rounded-xl py-2.5 px-3 gap-1 flex justify-between items-center text-sm custom-select-box" :class="customClass">
        {{ selectedTitle }}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </ListboxButton>

      <!-- Dropdown Options -->
      <ListboxOptions class="absolute w-full mt-1 bg-white border border-[#E4E7EC] rounded shadow-lg z-1111 overflow-y-auto max-h-64">
        <ListboxOption
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'cursor-pointer select-none py-2 px-4 text-sm',
              active ? 'bg-teal-50' : '',
              selected ? 'bg-teal-100' : ''
            ]"
          >
            {{ option.title }}
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options?: Array<{ title: string; value: string }>;
    customClass?: string;
  }>(),
  {
    options: () => [],
    modelValue: undefined,
    customClass: ''
  }
);

const emit = defineEmits(["update:modelValue"]);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string | undefined) => emit("update:modelValue", newValue),
});

const selectedTitle = computed(() => {
  if (!props.modelValue) return "Select an option";
  const found = props.options.find(o => o.value === props.modelValue);
  return found?.title ?? "Select an option";
});
</script>
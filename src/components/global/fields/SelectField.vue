<template>
  <Listbox v-model="selectedValue">
    <div class="relative">
      <!-- Dropdown Button -->
      <ListboxButton class="border border-solid! border-slate-300 bg-white w-full rounded-xl py-2 px-3 gap-1 flex justify-between items-center text-sm custom-select-box cursor-pointer" :class="customClass">
        {{ selectedTitle }}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </ListboxButton>

      <!-- Dropdown Options -->
      <ListboxOptions class="absolute w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-y-auto max-h-64 py-1">
        <ListboxOption
          v-for="(option, key) in options"
          :key="key"
          :value="key"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'cursor-pointer select-none py-2 px-4 text-sm hover:bg-slate-50 transition-colors',
              active ? 'bg-teal-50 text-teal-700' : 'text-slate-600',
              selected ? 'bg-teal-100 font-semibold' : ''
            ]"
          >
            {{ (option && (option as any).title) || (option && (option as any).value) || option }}
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";

type OptionType = string | { title?: string; value?: string };
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options?: Record<string, OptionType>;
    customClass?: string
  }>(),
  {
    options: () => ({}),
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
  if (!props.options) return "Select an option";

  const key = selectedValue.value;
  if (!key) return "Select an option";

  const opt = props.options[key];

  if (typeof opt === "string") return opt;
  if (opt && typeof opt === "object") return opt.title ?? opt.value ?? "Select an option";

  return "Select an option";
});
</script>
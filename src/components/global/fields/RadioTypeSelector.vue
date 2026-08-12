<template>
  <div>
    <div v-if="label" class="flex items-center gap-1.5 mb-1">
      <label :class="labelClass" class="!mb-0">
        {{ label }}
      </label>
      <div
        v-if="helpMessage"
        ref="tooltipTrigger"
        class="relative flex items-center justify-center cursor-pointer"
        @mouseenter="openTooltip"
        @mouseleave="closeTooltip">
        <img v-svg-inline src="@/assets/icons/form-settings/info.svg" class="w-3.5 h-3.5 text-slate-400" />
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="helpMessage && showTooltip"
        class="fixed max-w-52 w-max bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl pointer-events-none text-center leading-relaxed whitespace-normal break-words z-[9999]"
        :style="{
          top: tooltipPosition.top + 'px',
          left: tooltipPosition.left + 'px',
          transform: 'translate(-50%, -100%)',
        }">
        {{ helpMessage }}
        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
      </div>
    </Teleport>

    <div class="bg-[#f0f0f1] rounded-md p-1" :class="width === 'full' ? 'w-full' : 'w-max'">
      <div class="grid gap-2" :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }">
        <div v-for="option in options" :key="option.value" class="custom-radio-group">
          <input
            type="radio"
            class="sr-only"
            :id="id ? `${option.value}_${id}` : `${name}_${option.value}`"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="updateValue(option.value)"
            :disabled="option.disabled" />

          <label
            :for="id ? `${option.value}_${id}` : `${name}_${option.value}`"
            role="radio"
            class="flex items-center justify-center w-full rounded-md py-1.5 px-2.5 cursor-pointer transition text-gray-700 hover:bg-white h-full whitespace-nowrap text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{
              'opacity-50 cursor-not-allowed': option.disabled,
            }"
            v-html="option.label">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from "vue";
  import { ref } from "vue";

  const tooltipTrigger = ref<HTMLElement | null>(null);
  const showTooltip = ref(false);
  const tooltipPosition = ref({ top: 0, left: 0 });

  const openTooltip = () => {
    if (!tooltipTrigger.value) return;
    const rect = tooltipTrigger.value.getBoundingClientRect();
    tooltipPosition.value = {
      top: rect.top + window.scrollY - 8,
      left: rect.left + rect.width / 2 + window.scrollX,
    };
    showTooltip.value = true;
  };

  const closeTooltip = () => {
    showTooltip.value = false;
  };

  interface RadioOption {
    label: string;
    value: string | number;
    disabled?: boolean;
  }

  defineProps({
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    options: {
      type: Array as PropType<RadioOption[]>,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "block text-sm font-semibold text-gray-700 mb-1",
    },
    helpMessage: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "radio-group",
    },
    columns: {
      type: Number,
      default: 2,
    },
    id: {
      type: String,
      default: "",
    },
    width: {
  type: String,
  default: "max", 
},
  });

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();

  function updateValue(value: string | number) {
    emit("update:modelValue", value);
  }
</script>

<style scoped>
  .custom-radio-group input[type="radio"]:checked + label {
    background-color: #ffffff;
  }
</style>

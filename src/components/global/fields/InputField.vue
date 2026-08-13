<template>
  <div class="input-field">
    <div class="input-wrapper">
      <label v-if="label" :for="getFieldID" :class="labelClass" :style="labelStyle" class="block text-sm font-semibold text-gray-700 mb-1">
        <span class="inline-flex items-center gap-1.5">
          <span>{{ label }} <span v-if="required" class="text-red-500">*</span></span>
          <span
            v-if="helpMessage"
            ref="tooltipTrigger"
            class="relative flex items-center justify-center cursor-pointer pointer-events-auto"
            @mouseenter="openTooltip"
            @mouseleave="closeTooltip">
            <img v-svg-inline src="@/assets/icons/form-settings/info.svg" class="w-3.5 h-3.5 text-slate-400" />
          </span>
        </span>
      </label>

      <Teleport to="body">
        <div
          v-if="helpMessage && showTooltip"
          class="fixed max-w-40 w-max bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl pointer-events-none text-center leading-relaxed whitespace-normal break-words z-[9999]"
          :style="{
            top: tooltipPosition.top + 'px',
            left: tooltipPosition.left + 'px',
            transform: 'translate(-50%, -100%)',
          }">
          {{ helpMessage }}
          <span
            class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
        </div>
      </Teleport>
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
              'focus:ring-red-500': focusColor === 'red',
            },
            classes,
          ]"
          ref="inputField"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white"
          :placeholder="placeholder"
          @input="onChange"
          @blur="onBlur"
          @focusin="focusInHandler"
          @keydown="$emit('keydown', $event)"
          @focusout="focusOutHandler" />
          <slot />
      </div>
      
      <div v-for="(error, index) in validationMessage" :key="index" class="mt-[-4px]">
        <span v-if="index == 0" class="text-red-700 text-xs">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { isRTL } from "@/utils";
  import { v4 as uuidv4 } from "uuid";

  const tooltipTrigger = ref<HTMLElement | null>(null);
  const showTooltip = ref(false);
  const tooltipPosition = ref({ top: 0, left: 0 });

  const updateTooltipPosition = () => {
    if (!tooltipTrigger.value) return;
    const rect = tooltipTrigger.value.getBoundingClientRect();
    tooltipPosition.value = {
      top: rect.top + window.scrollY - 8,
      left: rect.left + rect.width / 2 + window.scrollX,
    };
  };

  const openTooltip = () => {
    updateTooltipPosition();
    showTooltip.value = true;
  };

  const closeTooltip = () => {
    showTooltip.value = false;
  };

  const emit = defineEmits(["update:modelValue", "input", "blur", "togglePassword", "focusin", "keydown", "focusout"]);

  const props = withDefaults(
    defineProps<{
      label?: string;
      labelClass?: string;
      value?: string | number;
      modelValue?: string | number;
      type: string;
      hasError?: boolean;
      fieldId?: string;
      placeholder?: string;
      readonly?: boolean;
      validationMessage?: { $message: string }[] | any;
      classes?: string;
      tooltip?: string;
      disable?: boolean;
      autofocus?: boolean;
      maxlength?: number;
      vModel?: string | any;
      focusColor?: "blue" | "teal" | "emerald" | "red"; // Added prop type
      required?: boolean;
      helpMessage?: string;
      labelStyle?: Record<string, string>;
    }>(),
    {
      type: "text",
      placeholder: "",
      readonly: false,
      hasIcon: false,
      disable: false,
      focusColor: "blue", // Added default fallback
    }
  );

  const getFieldID = computed(() => props?.fieldId || `input-${uuidv4()}`);
  const inputField = ref<HTMLInputElement | null>();

  const isFocused = ref(false);

  const focusInHandler = () => {
    isFocused.value = true;
    emit("focusin");
  };

  const focusOutHandler = () => {
    isFocused.value = false;
    emit("focusout");
  };

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit("input", target.value);
    emit("update:modelValue", target.value);
  };

  const onBlur = () => {
    emit("blur");
  };

  defineExpose({
    focus: () => {
      inputField.value?.focus();
    },
  });
</script>

<style scoped></style>

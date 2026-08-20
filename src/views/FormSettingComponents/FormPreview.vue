<template>
  <div
    :style="cssVars"
    class="gform-wrapper w-full h-full overflow-auto border border-slate-200 rounded-xl transition-colors duration-150">
    <div class="w-fit min-w-full">
      <div class="gform-header-container">
        <h2 v-if="formStyleSetting.formInfo.formTitle" class="font-bold break-words leading-tight gform-title">
          {{ formStyleSetting.formInfo.formTitle }}
        </h2>

        <p v-if="formStyleSetting.formInfo.formDescription" class="break-words leading-relaxed gform-desc">
          {{ formStyleSetting.formInfo.formDescription }}
        </p>
      </div>

      <div class="gform-body-container">
        <div v-for="field in formFieldSetting.fields" :key="field.id">
          <div
            v-if="['text', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)"
            class="relative"
            style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <InputField
              :disable="!interactive"
              :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
              :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
              :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
              :type="
                field.type === 'phone'
                  ? 'tel'
                  : field.type === 'password' && showPassword[field.id]
                    ? 'text'
                    : field.type
              "
              :placeholder="field.placeholder"
              v-model="formData[field.id]"
              @keydown="handleKeyDown($event, field.type)"
              :class="interactive ? '' : 'pointer-events-none'">
              <div
                v-if="field.type === 'password' && field.showPasswordIcon == 1"
                class="absolute w-4 h-4 flex items-center justify-center cursor-pointer pointer-events-auto"
                style="right: var(--input-padding-right); bottom: var(--input-padding-bottom)"
                @click="togglePasswordVisibility(field.id)">
                <img
                  :src="
                    showPassword[field.id]
                      ? '/src/assets/icons/submission-page/eye-line.svg'
                      : '/src/assets/icons/FormFields/EyesOff.svg'
                  "
                  class="w-4 h-4 opacity-50 transition-opacity" />
              </div>
            </InputField>
          </div>

          <div v-else-if="field.type === 'name'" style="width: var(--input-width)">
            <template v-if="field.nameFormat === 'split'">
              <div class="grid grid-cols-2 gap-4 w-full" style="width: var(--input-width)">
                <div class="relative w-full">
                  <HelpTooltip :message="field.firstNameHelpMessage" class="absolute top-0.5 right-1 z-10" />
                  <InputField
                    :disable="!interactive"
                    :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                    :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.firstNameLabel : ''"
                    :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                    type="text"
                    :placeholder="field.firstNamePlaceholder"
                    v-model="formData[field.id + '_firstName']"
                    :class="interactive ? '' : 'pointer-events-none'" />
                </div>
                <div class="relative w-full">
                  <HelpTooltip :message="field.lastNameHelpMessage" class="absolute top-0.5 right-1 z-10" />
                  <InputField
                    :disable="!interactive"
                    :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                    :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.lastNameLabel : ''"
                    :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                    type="text"
                    :placeholder="field.lastNamePlaceholder"
                    v-model="formData[field.id + '_lastName']"
                    :class="interactive ? '' : 'pointer-events-none'" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="relative w-full">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <InputField
                  :disable="!interactive"
                  :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                  :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
                  :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                  type="text"
                  :placeholder="field.placeholder"
                  v-model="formData[field.id]"
                  :class="interactive ? '' : 'pointer-events-none'" />
              </div>
            </template>
          </div>

          <div v-else-if="field.type === 'textarea'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <TextareaField
              :disable="!interactive"
              :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
              :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
              :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
              :placeholder="field.placeholder"
              v-model="formData[field.id]"
              :rows="field.rows || 2"
              textareaClass="h-auto"
              :class="interactive ? '' : 'pointer-events-none'" />
          </div>

          <div v-else-if="field.type === 'dropdown'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1"
              :class="labelPositionClass(field.labelPlacement)">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <SelectField
              v-model="formData[field.id]"
              :options="
                Object.fromEntries([field.placeholder || ' ', ...(field.options || [])].map((opt) => [opt, opt]))
              "
              :class="interactive ? '' : 'pointer-events-none'" />
          </div>

          <div
            v-else-if="field.type === 'multiselect'"
            class="relative multiselect-wrapper"
            :data-field-id="field.id"
            style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1"
              :class="labelPositionClass(field.labelPlacement)">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative">
              <button
                type="button"
                @click="toggleMultiselect(field.id)"
                :class="[
                  interactive ? 'cursor-pointer' : 'pointer-events-none',
                  'border border-slate-300 bg-white w-full rounded-xl gap-1 flex justify-between items-center text-sm custom-select-box',
                ]">
                <span
                  class="truncate"
                  :class="formData[field.id]?.length ? '' : 'gform-placeholder'"
                  :style="{
                    color: formData[field.id]?.length ? 'var(--input-text-color)' : 'var(--input-placeholder-color)',
                  }">
                  {{ getMultiselectLabel(field) }}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </button>

              <div
                v-if="interactive && openMultiselect[field.id]"
                class="absolute mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-y-auto max-h-56 py-1"
                :style="{
                  width: 'var(--input-width)',
                }">
                <div
                  v-for="opt in field.options || []"
                  :key="opt"
                  @click="toggleMultiselectOption(field.id, opt)"
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50/60 cursor-pointer transition-colors select-none">
                  <CustomDefaultCheckbox
                    :label="opt"
                    :modelValue="isOptionSelected(field.id, opt)"
                    @update:modelValue="toggleMultiselectOption(field.id, opt)"
                    size="sm"
                    labelClass="text-sm py-0.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="field.type === 'radio'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              :class="labelPositionClass(field.labelPlacement)"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-1 radio-checkbox-options-container items-start text-left">
              <CustomDefaultRadio
                v-for="(opt, idx) in field.options || []"
                :key="opt"
                :id="'preview-radio-' + field.id + '-' + idx"
                :name="'preview-radio-' + field.id"
                :value="opt"
                :label="opt"
                :modelValue="formData[field.id] || null"
                @update:modelValue="formData[field.id] = $event"
                :class="interactive ? '' : 'pointer-events-none'" />
            </div>
          </div>

          <div v-else-if="field.type === 'checkboxes'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              :class="labelPositionClass(field.labelPlacement)"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-1 radio-checkbox-options-container items-start text-left">
              <CustomDefaultCheckbox
                v-for="opt in field.options || []"
                :key="opt"
                :label="opt"
                :modelValue="Boolean(formData[field.id + '_' + opt])"
                @update:modelValue="formData[field.id + '_' + opt] = $event"
                :class="interactive ? '' : 'pointer-events-none'"
                size="sm"
                labelClass="text-sm text-gray-700 py-0.5" />
            </div>
          </div>

          <div v-else-if="field.type === 'datepicker'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1"
              :class="labelPositionClass(field.labelPlacement)">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative" style="width: var(--input-width)">
              <input
                :disabled="!interactive"
                type="date"
                v-model="formData[field.id]"
                :class="[interactive ? '' : 'pointer-events-none', !formData[field.id] ? 'date-empty' : 'date-filled']"
                class="rounded-lg border border-slate-200 text-sm bg-slate-50/30 gform-input" />
              <span
                v-if="!formData[field.id]"
                class="absolute text-sm bg-transparent pointer-events-none gform-placeholder"
                style="bottom: var(--input-padding-bottom)">
                {{ field.placeholder || "dd-mm-yyyy" }}
              </span>
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/Calender.svg"
                class="w-4 h-4 text-slate-400 pointer-events-none"
                style="position: absolute; bottom: var(--input-padding-bottom)" />
            </div>
          </div>

          <div v-else-if="field.type === 'timepicker'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1"
              :class="labelPositionClass(field.labelPlacement)">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative" style="width: var(--input-width)">
              <input
                :disabled="!interactive"
                type="time"
                v-model="formData[field.id]"
                :class="[interactive ? '' : 'pointer-events-none', !formData[field.id] ? 'date-empty' : 'date-filled']"
                class="w-full rounded-lg border border-slate-200 text-sm bg-slate-50/30 gform-input" />
              <span
                v-if="!formData[field.id]"
                class="absolute text-sm bg-transparent pointer-events-none gform-placeholder"
                style="bottom: var(--input-padding-bottom)">
                {{ field.placeholder || "Select Time" }}
              </span>
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/timer.svg"
                class="w-4 h-4 text-slate-400 pointer-events-none"
                style="position: absolute; bottom: var(--input-padding-bottom)" />
            </div>
          </div>

          <div v-else-if="field.type === 'fileupload'" class="relative" style="width: var(--input-width)">
            <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1"
              :class="labelPositionClass(field.labelPlacement)">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div
              class="border-2 px-4 border-dashed border-slate-200 rounded-xl !h-auto flex flex-col items-center justify-center bg-slate-50/50 gform-input">
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/Upload.svg"
                class="w-5 h-5 shrink-0 text-slate-600 mb-1.5" />
              <span class="text-xs text-slate-500 gform-placeholder">{{ field.placeholder }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="formFieldSetting.fields && formFieldSetting.fields.length > 0"
        class="gform-footer-container"
        :class="submitButtonPlacementClass">
        <button
          type="button"
          class="gform-submit-btn font-semibold pointer-events-none"
          :class="submitButtonClass"
          disabled>
          {{ formFieldSetting.submitButtonText || "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from "vue";
  import { formSetting } from "@/composable/useFormSettings";
  import { useFormStyle } from "@/composable/useFormStyle";
  import { useFormFieldsBuilder } from "@/composable/useFormFieldBuilder";

  const props = withDefaults(
    defineProps<{
      interactive?: boolean;
    }>(),
    {
      interactive: false,
    }
  );

  const { formFieldSetting, formStyleSetting } = formSetting();
  const { cssVars } = useFormStyle();
  const { submitButtonClass, labelPositionClass } = useFormFieldsBuilder();

  const formData = ref<Record<string, any>>({});
  const showPassword = ref<Record<string, boolean>>({});
  const openMultiselect = ref<Record<string, boolean>>({});

  const submitButtonPlacementClass = computed(() => {
    const placement = formFieldSetting.value?.submitButtonPlacement || "center";
    if (placement === "left") return "flex justify-start w-full";
    if (placement === "right") return "flex justify-end w-full";
    return "flex justify-center w-full";
  });

  const handleKeyDown = (e: KeyboardEvent, type: string) => {
    if (["phone", "number"].includes(type)) {
      const allowedKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
        return;
      }
      if (type === "phone" && e.key === "+") {
        return;
      }
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const togglePasswordVisibility = (fieldId: string) => {
    if (!props.interactive) return;
    showPassword.value[fieldId] = !showPassword.value[fieldId];
  };

  const toggleMultiselect = (fieldId: string) => {
    if (!props.interactive) return;
    openMultiselect.value[fieldId] = !openMultiselect.value[fieldId];
  };

  const getMultiselectLabel = (field: any) => {
    const selected: string[] = formData.value[field.id] || [];
    if (!selected || selected.length === 0) {
      return field.placeholder || "Select options...";
    }
    if (selected.length === 1) {
      return selected[0];
    }
    return `${selected.length} selected`;
  };

  const toggleMultiselectOption = (fieldId: string, opt: string) => {
    if (!props.interactive) return;
    if (!Array.isArray(formData.value[fieldId])) {
      formData.value[fieldId] = [];
    }
    const index = formData.value[fieldId].indexOf(opt);
    if (index === -1) {
      formData.value[fieldId].push(opt);
    } else {
      formData.value[fieldId].splice(index, 1);
    }
  };

  const isOptionSelected = (fieldId: string, opt: string) => {
    const list = formData.value[fieldId];
    return Array.isArray(list) && list.includes(opt);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.closest(".multiselect-wrapper")) {
      Object.keys(openMultiselect.value).forEach((key) => {
        openMultiselect.value[key] = false;
      });
    }
  };

    // Synchronize default values from settings into preview form state
  watch(
    () => formFieldSetting.value.fields,
    (fields) => {
      if (!fields) return;
      fields.forEach((field) => {
        if (formData.value[field.id] === undefined) {
          if (field.type === 'name' && field.nameFormat === 'split') {
            if (formData.value[field.id + '_firstName'] === undefined) {
              formData.value[field.id + '_firstName'] = field.firstNameDefaultValue || '';
            }
            if (formData.value[field.id + '_lastName'] === undefined) {
              formData.value[field.id + '_lastName'] = field.lastNameDefaultValue || '';
            }
          } else {
            formData.value[field.id] = field.defaultValue || '';
          }
        }
      });
    },
    { deep: true, immediate: true }
  );

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<style scoped>
  :deep(.custom-select-box) {
    display: flex !important;
    align-items: center !important;
  }
  .gform-wrapper {
    scrollbar-gutter: stable;
  }
</style>

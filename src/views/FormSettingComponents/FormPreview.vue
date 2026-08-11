<template>
  <div
    :style="cssVars"
    class="gform-wrapper w-full h-full overflow-auto border border-slate-200 rounded-xl p-5 transition-colors duration-150">
    <div v-if="hasContent" class="space-y-4">
      <h2
        v-if="formStyleSetting.formInfo.formTitle"
        :style="formTitleStyle"
        class="font-bold break-words leading-tight">
        {{ formStyleSetting.formInfo.formTitle }}
      </h2>

      <p v-if="formStyleSetting.formInfo.formDescription" :style="formDescStyle" class="break-words leading-relaxed">
        {{ formStyleSetting.formInfo.formDescription }}
      </p>

      <div class="space-y-4 pt-1">
        <div v-for="field in formFieldSetting.fields" :key="field.id" class="space-y-1.5">
          <div
            v-if="['text', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)"
            class="relative"
            style="width: var(--input-width)">
            <InputField
              :disable="!interactive"
              :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
              :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
              :type="
                field.type === 'phone'
                  ? 'tel'
                  : field.type === 'password' && showPassword[field.id]
                    ? 'text'
                    : field.type
              "
              :placeholder="field.placeholder"
              v-model="formData[field.id]"
              :helpMessage="field.helpMessage"
              @keydown="handleKeyDown($event, field.type)"
              :classes="field.type === 'password' && field.showPasswordIcon == 1 ? 'pr-10' : ''"
              :class="interactive ? '' : 'pointer-events-none'">
              <!-- 👉 Eye icon placed inside InputField slot -->
              <div
                v-if="field.type === 'password' && field.showPasswordIcon == 1"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer pointer-events-auto"
                @click="togglePasswordVisibility(field.id)">
                <img
                  :src="
                    showPassword[field.id]
                      ? '/src/assets/icons/submission-page/eye-line.svg'
                      : '/src/assets/icons/FormFields/EyesOff.svg'
                  "
                  class="w-4 h-4 opacity-75 transition-opacity" />
              </div>
            </InputField>
          </div>

          <div v-else-if="field.type === 'name'">
            <template v-if="field.nameFormat === 'split'">
              <div class="grid grid-cols-2 gap-4 w-full">
                <InputField
                  :disable="!interactive"
                  :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                  :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.firstNameLabel : ''"
                  type="text"
                  :placeholder="field.firstNamePlaceholder"
                  v-model="formData[field.id + '_firstName']"
                  :helpMessage="field.helpMessage"
                  :class="interactive ? '' : 'pointer-events-none'" />
                <InputField
                  :disable="!interactive"
                  :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                  :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.lastNameLabel : ''"
                  type="text"
                  :placeholder="field.lastNamePlaceholder"
                  v-model="formData[field.id + '_lastName']"
                  :helpMessage="field.helpMessage"
                  :class="interactive ? '' : 'pointer-events-none'" />
              </div>
            </template>
            <template v-else>
              <InputField
                :disable="!interactive"
                :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
                type="text"
                :placeholder="field.placeholder"
                v-model="formData[field.id]"
                :helpMessage="field.helpMessage"
                :class="interactive ? '' : 'pointer-events-none'" />
            </template>
          </div>

          <div v-else-if="field.type === 'textarea'">
            <TextareaField
              :disable="!interactive"
              :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
              :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
              :placeholder="field.placeholder"
              v-model="formData[field.id]"
              :rows="field.rows || 2"
              textareaClass="h-auto"
              :class="interactive ? '' : 'pointer-events-none'" />
          </div>

          <div v-else-if="field.type === 'dropdown'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <SelectField
              v-model="formData[field.id]"
              :options="
                Object.fromEntries([field.placeholder || ' ', ...(field.options || [])].map((opt) => [opt, opt]))
              "
              :class="interactive ? '' : 'pointer-events-none'" />
          </div>

          <div v-else-if="field.type === 'multiselect'" class="relative multiselect-wrapper" :data-field-id="field.id">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative">
              <button
                type="button"
                @click="toggleMultiselect(field.id)"
                :class="[
                  interactive ? 'cursor-pointer' : 'pointer-events-none',
                  'border border-slate-300 bg-white w-full rounded-xl py-2 px-3 gap-1 flex justify-between items-center text-sm custom-select-box',
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
                class="absolute w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-y-auto max-h-56 py-1">
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

          <div v-else-if="field.type === 'radio'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-1">
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

          <div v-else-if="field.type === 'checkboxes'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-1 px-3">
              <CustomDefaultCheckbox
                v-for="opt in field.options || []"
                :key="opt"
                :label="opt"
                :modelValue="Boolean(formData[field.id + '_' + opt])"
                @update:modelValue="formData[field.id + '_' + opt] = $event"
                :class="interactive ? '' : 'pointer-events-none'"
                size="sm"
                labelClass="text-sm py-0.5" />
            </div>
          </div>

          <div v-else-if="field.type === 'datepicker'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative" style="width: var(--input-width)">
              <input
                :disabled="!interactive"
                type="date"
                v-model="formData[field.id]"
                :class="[interactive ? '' : 'pointer-events-none', !formData[field.id] ? 'date-empty' : 'date-filled']"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 gform-input" />

              <span
                v-if="!formData[field.id]"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-sm bg-transparent pointer-events-none pr-10 gform-placeholder">
                {{ field.placeholder || "dd-mm-yyyy" }}
              </span>
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/Calender.svg"
                class="w-4 h-4 text-slate-400 pointer-events-none"
                style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" />
            </div>
          </div>

          <div v-else-if="field.type === 'timepicker'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative" style="width: var(--input-width)">
              <input
                :disabled="!interactive"
                type="time"
                v-model="formData[field.id]"
                :class="[interactive ? '' : 'pointer-events-none', !formData[field.id] ? 'date-empty' : 'date-filled']"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 gform-input" />
              <span
                v-if="!formData[field.id]"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-sm bg-transparent pointer-events-none pr-10 gform-placeholder">
                {{ field.placeholder || "Select Time" }}
              </span>
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/timer.svg"
                class="w-4 h-4 text-slate-400 pointer-events-none"
                style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" />
            </div>
          </div>

          <!-- 9. Fileupload -->
          <div v-else-if="field.type === 'fileupload'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div
              class="border-2 border-dashed border-slate-200 rounded-xl !h-auto !py-5 px-4 flex flex-col items-center justify-center bg-slate-50/50 gform-input">
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/Upload.svg"
                class="w-5 h-5 shrink-0 text-slate-600 mb-1.5" />
              <span class="text-xs text-slate-500 gform-placeholder">{{ field.placeholder }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="formFieldSetting.fields && formFieldSetting.fields.length > 0"
          class="pt-2"
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
    <div
      v-else
      class="flex flex-col items-center justify-center h-full min-h-[240px] text-center text-slate-400 gap-2 py-10">
      <svg class="w-8 h-8 text-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 8H17V10H7V8ZM7 12H17V14H7V12ZM7 16H13V18H7V16Z"></path>
      </svg>
      <p class="text-sm">Add a form title, description, or fields to see your live preview</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from "vue";
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
  const { submitButtonClass } = useFormFieldsBuilder();

  const formData = ref<Record<string, any>>({});
  const showPassword = ref<Record<string, boolean>>({});
  const openMultiselect = ref<Record<string, boolean>>({});

  const hasContent = computed(() => {
    const title = formStyleSetting.value?.formInfo?.formTitle;
    const desc = formStyleSetting.value?.formInfo?.formDescription;
    const fields = formFieldSetting.value?.fields;
    return !!title || !!desc || (Array.isArray(fields) && fields.length > 0);
  });

  const formTitleStyle = computed(() => {
    const title = formStyleSetting.value?.formTitleStyle || {};
    return {
      color: title.formTitleTextColor || "#1e293b",
      fontSize: `${title.formTitleFontSize ?? 16}px`,
      textAlign: (title.formTitleAlign || "left") as any,
      paddingTop: `${title.formTitlePaddingTop ?? 0}px`,
      paddingRight: `${title.formTitlePaddingRight ?? 0}px`,
      paddingBottom: `${title.formTitlePaddingBottom ?? 0}px`,
      paddingLeft: `${title.formTitlePaddingLeft ?? 0}px`,
      marginTop: `${title.formTitleMarginTop ?? 0}px`,
      marginRight: `${title.formTitleMarginRight ?? 0}px`,
      marginBottom: `${title.formTitleMarginBottom ?? 10}px`,
      marginLeft: `${title.formTitleMarginLeft ?? 0}px`,
    };
  });

  const formDescStyle = computed(() => {
    const desc = formStyleSetting.value?.formDescStyle || {};
    return {
      color: desc.formDescTextColor || "#5f6368",
      fontSize: `${desc.formDescFontSize ?? 14}px`,
      textAlign: (desc.formDescAlign || "left") as any,
      paddingTop: `${desc.formDescPaddingTop ?? 0}px`,
      paddingRight: `${desc.formDescPaddingRight ?? 0}px`,
      paddingBottom: `${desc.formDescPaddingBottom ?? 0}px`,
      paddingLeft: `${desc.formDescPaddingLeft ?? 0}px`,
      marginTop: `${desc.formDescMarginTop ?? 0}px`,
      marginRight: `${desc.formDescMarginRight ?? 0}px`,
      marginBottom: `${desc.formDescMarginBottom ?? 20}px`,
      marginLeft: `${desc.formDescMarginLeft ?? 0}px`,
    };
  });

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

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<style scoped>
  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  /* 2. Hide native text when empty and not focused */
  input.date-empty:not(:focus)::-webkit-datetime-edit {
    color: transparent !important;
  }
  input.date-filled::-webkit-datetime-edit,
  input:focus::-webkit-datetime-edit {
    color: var(--input-text-color) !important;
  }
  /* 3. Fix text overlap: Hide placeholder span when clicked / focused */
  input:focus ~ .gform-placeholder {
    display: none !important;
  }

  :deep(.custom-select-box) {
    display: flex !important;
    align-items: center !important;
  }
  .gform-wrapper {
    scrollbar-gutter: stable;
  }
</style>

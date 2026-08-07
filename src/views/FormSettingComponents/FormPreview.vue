<template>
  <!-- Form Container Box -->
  <div :style="cssVars" class="gform-wrapper border border-slate-200 rounded-xl p-5 transition-all duration-150">
    <div class="space-y-4">
      <!-- Form Title -->
      <h2 
        v-if="formStyleSetting.formInfo.formTitle" 
        class="font-bold break-words leading-tight"
      >
        {{ formStyleSetting.formInfo.formTitle }}
      </h2>

      <!-- Form Description -->
      <p 
        v-if="formStyleSetting.formInfo.formDescription" 
        class="break-words leading-relaxed"
      >
        {{ formStyleSetting.formInfo.formDescription }}
      </p>

      <!-- Dynamic Form Fields -->
      <div class="space-y-4 pt-1">
        <div 
          v-for="field in formFieldSetting.fields" 
          :key="field.id" 
          class="space-y-1.5"
        >
          <!-- 1. Text, Email, Number, Phone, Url, Password fields -->
          <div 
            v-if="['text', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)"
            class="relative"
          >
            <InputField
              disable
              :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
              :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
              :type="field.type"
              :placeholder="field.placeholder"
              :modelValue="field.defaultValue"
              :helpMessage="field.helpMessage"
              :classes="field.type === 'password' && field.showPasswordIcon == 1 ? 'pr-10' : ''"
              class="pointer-events-none" 
            />
            <div
              v-if="field.type === 'password' && field.showPasswordIcon == 1"
              style="position: absolute; right: 14px; bottom: 11px"
              class="pointer-events-none flex items-center justify-center"
            >
              <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <!-- 2. Name Field -->
          <div v-else-if="field.type === 'name'">
            <template v-if="field.nameFormat === 'split'">
              <div class="grid grid-cols-2 gap-3">
                <InputField
                  disable
                  :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                  :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.firstNameLabel : ''"
                  type="text"
                  :placeholder="field.firstNamePlaceholder"
                  :modelValue="field.defaultValue"
                  :helpMessage="field.helpMessage"
                  class="pointer-events-none" 
                />
                <InputField
                  disable
                  :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                  :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.lastNameLabel : ''"
                  type="text"
                  :placeholder="field.lastNamePlaceholder"
                  :modelValue="field.defaultValue"
                  :helpMessage="field.helpMessage"
                  class="pointer-events-none" 
                />
              </div>
            </template>
            <template v-else>
              <InputField
                disable
                :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
                :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
                type="text"
                :placeholder="field.placeholder"
                :modelValue="field.defaultValue"
                :helpMessage="field.helpMessage"
                class="pointer-events-none" 
              />
            </template>
          </div>

          <!-- 3. Textarea Field -->
          <div v-else-if="field.type === 'textarea'">
            <TextareaField
              disable
              :required="field.required && formStyleSetting.labelStyle.showLabel === 'show'"
              :label="formStyleSetting.labelStyle.showLabel === 'show' ? field.label : ''"
              :placeholder="field.placeholder"
              :model-value="field.defaultValue"
              :rows="field.rows || 2"
              textareaClass="h-auto"
              class="pointer-events-none" 
            />
          </div>

          <!-- 4. Dropdown or Multiselect -->
          <div v-else-if="['dropdown', 'multiselect'].includes(field.type)">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1"
            >
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <SelectField
              :modelValue="field.placeholder || ' '"
              :options="
                Object.fromEntries([field.placeholder || ' ', ...(field.options || [])].map((opt) => [opt, opt]))
              "
              class="pointer-events-none" 
            />
          </div>

          <!-- 5. Radio Selector -->
          <div v-else-if="field.type === 'radio'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1"
            >
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-1">
              <CustomDefaultRadio
                v-for="(opt, idx) in field.options"
                :key="opt"
                :id="field.id + '-' + idx"
                :name="field.id"
                :value="opt"
                :label="opt"
                :modelValue="null"
                class="pointer-events-none" 
              />
            </div>
          </div>

          <!-- 6. Checkboxes Selector -->
          <div v-else-if="field.type === 'checkboxes'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold pointer-events-none select-none gform-label mb-1"
            >
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-1 px-3">
              <CustomDefaultCheckbox
                v-for="opt in field.options"
                :key="opt"
                :label="opt"
                class="pointer-events-none"
                size="sm"
                labelClass="text-sm py-0.5" 
              />
            </div>
          </div>

          <!-- 7. Datepicker -->
          <div v-else-if="field.type === 'datepicker'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1"
            >
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative w-full">
              <input
                disabled
                type="date"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none gform-input" 
              />
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10"
              >
                {{ field.placeholder }}
              </span>
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/Calender.svg"
                class="w-4 h-4 text-slate-400 pointer-events-none"
                style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" 
              />
            </div>
          </div>

          <!-- 8. Timepicker -->
          <div v-else-if="field.type === 'timepicker'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1"
            >
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="relative w-full">
              <input
                disabled
                type="time"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none gform-input" 
              />
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10"
              >
                {{ field.placeholder || "Select Time" }}
              </span>
              <img
                v-svg-inline
                src="@/assets/icons/FormFields/timer.svg"
                class="w-4 h-4 text-slate-400 pointer-events-none"
                style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" 
              />
            </div>
          </div>

          <!-- 9. Fileupload -->
          <div v-else-if="field.type === 'fileupload'">
            <label
              v-if="formStyleSetting.labelStyle.showLabel === 'show'"
              class="block text-sm font-semibold gform-label mb-1"
            >
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div
              class="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 gform-input"
            >
              <img v-svg-inline src="@/assets/icons/FormFields/Upload.svg" class="w-4 h-4 text-slate-600 mb-1" />
              <span class="text-xs text-slate-500">{{ field.placeholder }}</span>
            </div>
          </div>

          <!-- 10. Hidden Field -->
          <div
            v-else-if="field.type === 'hidden'"
            class="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-100/50 flex items-center justify-between text-slate-500"
          >
            <div class="flex items-center gap-2">
              <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-600" />
              <span class="text-xs font-semibold uppercase tracking-wider">Hidden Field</span>
            </div>
          </div>
        </div>

        <!-- Submit Button (Shows only if there are fields added) -->
        <div v-if="formFieldSetting.fields && formFieldSetting.fields.length > 0" class="pt-2">
          <button 
            type="button" 
            class="w-full transition-all font-semibold pointer-events-none gform-submit-btn"
            disabled
          >
            {{ formFieldSetting.submitButtonText || 'Submit' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formSetting } from "@/composable/useFormSettings";
import { useFormStyle } from "@/composable/useFormStyle";

const { formFieldSetting, formStyleSetting } = formSetting();
const { cssVars } = useFormStyle();

</script>
<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
    <section
      class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm lg:sticky lg:top-[80px] max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 data-v-971cfb3b="" class="font-semibold text-slate-800 text-md">Field Library</h3>
      </div>
      <div class="grid grid-cols-1 gap-2 p-5">
        <button v-for="item in fieldLibrary" :key="item.type" @click="addField(item.type)"
          class="w-full flex items-center gap-3 px-4 py-3 border border-slate-100 hover:ring-2 hover:ring-teal-500 hover:bg-teal-50/10 rounded-xl text-left text-sm text-slate-700 font-medium transition-all cursor-pointer group">
          <div
            class="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-teal-100/60 flex items-center justify-center text-slate-500 group-hover:text-teal-700 transition-colors">
            <img v-svg-inline :src="item.icon" :alt="item.label"
              class="w-4 h-4 text-slate-500 group-hover:text-teal-600 transition-colors fill-current" />
          </div>
          {{ item.label }}
        </button>
      </div>
    </section>

    <section
      class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Form Preview</h3>
        <span v-if="formFieldSetting.fields.length > 0" class="text-xs text-teal-600 font-medium">Click on a field to
          edit it</span>
      </div>

      <div class="p-5 overflow-y-auto flex-1 scrollbar-thin">
        <form @submit.prevent class="space-y-5">
          <div v-if="formFieldSetting.fields.length === 0"
            class="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400 flex flex-col items-center">
            <img v-svg-inline src="@/assets/icons/dashboardpage/add-circle-line.svg" class="w-10 h-10 text-teal-600" />
            <h4 class="font-semibold text-sm text-slate-700 mb-1">Your Form is Empty</h4>
            <p class="text-xs max-w-[240px]">
              Click on any field in the Field Library on the left to add it to your form.
            </p>
          </div>
          <div v-for="(field, index) in formFieldSetting.fields" :key="field.id" @click.stop="selectField(field.id)"
            draggable="true" @dragstart="onDragStart(index, $event)" @dragover="onDragOver(index, $event)"
            @dragleave="onDragLeave" @drop="onDrop(index)" @dragend="onDragEnd"
            class="p-4 border rounded-xl relative cursor-pointer transition-all duration-200" :class="[
              formFieldSetting.selectedFieldId === field.id
                ? 'border-l-[3px] border-teal-600 border-t-slate-200 border-r-slate-200 border-b-slate-200 bg-slate-50 shadow-sm rounded-l-none'
                : 'border-slate-100 hover:border-slate-200 hover:bg-teal-100/10',
              dragOverIndex === index ? 'border-t-2 border-t-teal-600 scale-[0.98]' : '',
              draggedIndex === index
                ? 'bg-teal-50/40 opacity-75 border-2 border-dashed border-teal-500 shadow-inner'
                : '',
            ]">
            <div v-if="formFieldSetting.selectedFieldId === field.id"
              class="flex items-center justify-end gap-1.5 mb-1">
              <button type="button" @mousedown="
                isDraggable = true;
              selectField(field.id);
              " @mouseup="isDraggable = false" @mouseleave="isDraggable = false"
                class="drag-handle w-7 h-7 rounded bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors text-amber-400"
                :class="isDraggable ? 'cursor-grabbing' : 'cursor-grab'" title="Drag to reorder">
                <img v-svg-inline src="@/assets/icons/form-settings/drag-drop.svg"
                  class="w-4 h-4 text-teal-600 pointer-events-none" draggable="false" />
              </button>

              <button type="button" @click.stop="duplicateField(field.id)"
                class="w-7 h-7 rounded bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors text-blue-400 cursor-pointer"
                title="Duplicate Field">
                <img v-svg-inline src="@/assets/icons/form-list/clone.svg" class="w-4! h-4!" />
              </button>

              <button type="button" @click.stop="removeField(field.id)"
                class="w-7 h-7 rounded bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors text-red-500 hover:text-red-400 cursor-pointer"
                title="Delete Field">
                <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-4 h-4" />
              </button>
            </div>

            <div class="space-y-1.5"
              v-if="['text', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)">
              <div class="relative">
                <InputField disable :required="field.required" :label="field.label"
                  :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                  :type="field.type === 'name' ? 'text' : field.type" :placeholder="field.placeholder"
                  :classes="field.type === 'password' && field.showPasswordIcon == 1 ? 'pr-10' : ''"
                  class="pointer-events-none" />

                <div v-if="field.type === 'password' && field.showPasswordIcon == 1"
                  style="position: absolute; right: 14px; bottom: 11px"
                  class="pointer-events-none flex items-center justify-center">
                  <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'name'">
              <template v-if="field.nameFormat === 'split'">
                <div class="grid grid-cols-2 gap-3">
                  <InputField disable :required="field.required" :label="field.firstNameLabel"
                    :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'" type="text"
                    :placeholder="field.firstNamePlaceholder" class="pointer-events-none" />
                  <InputField disable :required="field.required" :label="field.lastNameLabel"
                    :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'" type="text"
                    :placeholder="field.lastNamePlaceholder" class="pointer-events-none" />
                </div>
              </template>
              <template v-else>
                <InputField disable :required="field.required" :label="field.label"
                  :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'" type="text"
                  :placeholder="field.placeholder" class="pointer-events-none" />
              </template>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'textarea'">
              <TextareaField :required="field.required" :label="field.label"
                :label-class="labelPositionClass(field.labelPlacement) + ' block w-full'"
                :placeholder="field.placeholder" :rows="field.rows" textareaClass="h-auto"
                class="pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="['dropdown', 'multiselect'].includes(field.type)">
              <label class="block text-sm font-semibold text-gray-700 pointer-events-none select-none"
                :class="labelPositionClass(field.labelPlacement)">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <SelectField :modelValue="field.placeholder || ' '"
                :options="{ [field.placeholder || ' ']: field.placeholder || ' ' }" class="pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'radio'">
              <label class="block text-sm font-semibold text-slate-700 pointer-events-none select-none"
                :class="labelPositionClass(field.labelPlacement)">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="flex flex-col gap-1">
                <CustomDefaultRadio v-for="(opt, idx) in field.options" :key="opt" :id="field.id + '-' + idx"
                  :name="field.id" :value="opt" :label="opt" :modelValue="null" class="pointer-events-none" />
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'checkboxes'">
              <label class="block text-sm font-semibold text-slate-700 pointer-events-none select-none"
                :class="labelPositionClass(field.labelPlacement)">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>

              <div class="flex flex-col gap-1 px-3">
                <CustomDefaultCheckbox v-for="opt in field.options" :key="opt" :label="opt" class="pointer-events-none"
                  size="sm" labelClass="text-sm text-gray-700 py-0.5" />
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'datepicker'">
              <label class="block text-sm font-semibold text-slate-700"
                :class="labelPositionClass(field.labelPlacement)">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="relative w-full">
                <input disabled type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10">
                  {{ field.placeholder }}
                </span>
                <img v-svg-inline src="@/assets/icons/FormFields/Calender.svg"
                  class="w-4 h-4 text-slate-400 pointer-events-none"
                  style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" />
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'timepicker'">
              <label class="block text-sm font-semibold text-slate-700"
                :class="labelPositionClass(field.labelPlacement)">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="relative w-full">
                <input disabled type="time"
                  class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10">
                  {{ field.placeholder || "Select Time" }}
                </span>
                <img v-svg-inline src="@/assets/icons/FormFields/timer.svg"
                  class="w-4 h-4 text-slate-400 pointer-events-none"
                  style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" />
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'fileupload'">
              <label class="block text-sm font-semibold text-slate-700"
                :class="labelPositionClass(field.labelPlacement)">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div
                class="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50">
                <img v-svg-inline src="@/assets/icons/FormFields/Upload.svg" class="w-4 h-4 text-slate-600" />
                <span class="text-xs text-slate-500">{{ field.placeholder }}</span>
              </div>
            </div>

            <div
              class="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-100/50 flex items-center justify-between text-slate-500"
              v-else-if="field.type === 'hidden'">
              <div class="flex items-center gap-2">
                <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-600" />
                <span class="text-xs font-semibold uppercase tracking-wider">Hidden Field</span>
              </div>
              <span class="text-xs font-medium">{{ field.label }}</span>
            </div>
          </div>

          <button disabled type="button" v-if="formFieldSetting.fields.length > 0"
            class="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-teal-100/30 hover:shadow-xl hover:shadow-teal-200/20">
            Submit
          </button>
        </form>
      </div>
    </section>

    <section
      class="settings-panel lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden lg:sticky lg:top-[80px] max-h-[calc(100vh-160px)]">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Field Settings</h3>
      </div>

      <div class="px-5 overflow-y-auto flex-1 scrollbar-thin">
        <div v-if="selectedField" class="space-y-4 my-5">
          <template v-if="selectedField.type === 'name'">
            <div class="flex items-center gap-1.5 mb-2">
              <label class="text-sm font-semibold text-gray-700 select-none">Name Format</label>
              <div class="relative group cursor-pointer flex items-center justify-center">
                <img v-svg-inline src="@/assets/icons/form-settings/info.svg" alt="Info Tooltip" />

                <div
                  class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 text-center z-50 leading-relaxed">
                  Choose whether to collect the full name or separate First and Last Name.
                  <div
                    class="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900">
                  </div>
                </div>
              </div>
            </div>

            <RadioTypeSelector v-model="selectedField.nameFormat" name="nameFormat" :columns="2" :options="[
              { label: 'Full Name', value: 'single' },
              { label: 'Split Name', value: 'split' },
            ]" />
          </template>
          <template v-if="selectedField.type === 'name' && selectedField.nameFormat === 'split'">
            <div>
              <InputField type="text" v-model="selectedField.firstNameLabel" label="First Name Label"
                focusColor="teal" />
            </div>
            <div>
              <InputField type="text" v-model="selectedField.firstNamePlaceholder" label="First Name Placeholder"
                focusColor="teal" />
            </div>
            <div>
              <InputField type="text" v-model="selectedField.lastNameLabel" label="Last Name Label" focusColor="teal" />
            </div>
            <div>
              <InputField type="text" v-model="selectedField.lastNamePlaceholder" label="Last Name Placeholder"
                focusColor="teal" />
            </div>
          </template>
          <template v-else>
            <div>
              <InputField type="text" v-model="selectedField.label" label="Field Label" focusColor="teal" />
            </div>
            <div v-if="!['hidden', 'checkboxes', 'radio'].includes(selectedField.type)">
              <InputField type="text" v-model="selectedField.placeholder" label="Placeholder" focusColor="teal" />
            </div>
          </template>
          <div v-if="selectedField.type === 'textarea'">
            <InputField type="number" v-model.number="selectedField.rows" label="Rows" focusColor="teal" :min="1" />
          </div>

          <div v-if="selectedField.type !== 'hidden'">
            <RadioTypeSelector v-model="selectedField.labelPlacement" label="Label Placement" name="labelPlacement"
              :columns="3" :options="[
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ]" />
          </div>

          <template v-if="selectedField.type === 'timepicker'">
            <RadioTypeSelector v-model="selectedField.timeFormat" label="Time Format" name="timeFormat" :columns="2"
              :options="[
                { label: '12 Hour', value: '12h' },
                { label: '24 Hour', value: '24h' },
              ]" />
          </template>

          <div v-if="selectedField.type !== 'hidden'">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Required</label>
            <div class="flex">
              <CustomDefaultRadio id="required-yes" name="required" :value="1" label="Yes"
                v-model="selectedField.required" />
              <CustomDefaultRadio id="required-no" name="required" :value="0" label="No"
                v-model="selectedField.required" />
            </div>
          </div>

          <div v-if="selectedField.required">
            <InputField type="text" v-model="selectedField.requiredMessage" label="Required message"
              focusColor="teal" />
          </div>

          <template v-if="selectedField.type === 'email'">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Validate Email</label>
              <div class="flex">
                <CustomDefaultRadio id="validate-email-yes" name="validateEmail" :value="1" label="Yes"
                  v-model="selectedField.validateEmail" />
                <CustomDefaultRadio id="validate-email-no" name="validateEmail" :value="0" label="No"
                  v-model="selectedField.validateEmail" />
              </div>
            </div>
            <div v-if="selectedField.validateEmail">
              <InputField type="text" v-model="selectedField.emailErrorMessage" label="Error message"
                focusColor="teal" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Unique Email Address</label>
              <div class="flex">
                <CustomDefaultRadio id="unique-email-yes" name="uniqueEmail" :value="1" label="Yes"
                  v-model="selectedField.uniqueEmail" />
                <CustomDefaultRadio id="unique-email-no" name="uniqueEmail" :value="0" label="No"
                  v-model="selectedField.uniqueEmail" />
              </div>
            </div>
            <div v-if="selectedField.uniqueEmail">
              <InputField type="text" v-model="selectedField.uniqueEmailErrorMessage" label="Unique error message"
                focusColor="teal" />
            </div>
          </template>
          <template v-if="selectedField.type === 'password'">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Show Visibility Icon</label>
              <div class="flex">
                <CustomDefaultRadio id="show-password-icon-yes" name="showPasswordIcon" :value="1" label="Yes"
                  v-model="selectedField.showPasswordIcon" />
                <CustomDefaultRadio id="show-password-icon-no" name="showPasswordIcon" :value="0" label="No"
                  v-model="selectedField.showPasswordIcon" />
              </div>
            </div>
          </template>
        </div>

        <div v-else class="flex flex-col items-center justify-center text-center py-16">
          <div class="w-14 h-14 rounded-full bg-slate-100/80 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6 text-slate-500">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3.5l7.5 4.3v8.6L12 20.7l-7.5-4.3V7.8L12 3.5z" />
              <circle cx="12" cy="12" r="2.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <p class="text-sm text-slate-500 font-medium max-w-[240px] leading-relaxed">
            Select a field to configure its settings
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFormFieldsBuilder } from "@/composable/useFormFieldBuilder";
const {
  fieldLibrary,
  formFieldSetting,
  selectedField,
  selectField,
  removeField,
  addField,
  labelPositionClass,
  duplicateField,
  draggedIndex,
  dragOverIndex,
  isDraggable,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
} = useFormFieldsBuilder();
</script>

<style scoped>
input[type="date"]::-webkit-datetime-edit,
input[type="time"]::-webkit-datetime-edit {
  color: transparent !important;
}

.settings-panel :deep(.discount-type-radio-toggle label) {
  padding-left: 0 !important;
}
</style>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)]">
    <section
      class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm h-[420px] lg:h-full lg:max-h-[calc(100vh-210px)] flex flex-col overflow-hidden">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 data-v-971cfb3b="" class="font-semibold text-slate-800 text-md">Field Library</h3>
      </div>
      <div class="p-5 overflow-y-auto flex-1 scrollbar-thin">
        <!-- Loading Field Library Skeleton -->
        <div v-if="isLoading" class="grid grid-cols-1 gap-2 animate-pulse">
          <div
            v-for="i in 16"
            :key="i"
            class="w-full flex items-center gap-3 px-4 py-3 border border-slate-100 rounded-xl bg-white">
            <div class="w-8 h-8 rounded-lg bg-slate-200 flex-shrink-0"></div>
            <div class="h-4 bg-slate-200 rounded w-24"></div>
          </div>
        </div>

        <!-- Real Loaded Field Library Items -->
        <div v-else class="grid grid-cols-1 gap-2">
          <button
            v-for="item in fieldLibrary"
            :key="item.type"
            @click="isFieldLocked(item.type) ? openUpgradeModal() : addField(item.type)"
            class="w-full flex items-center gap-3 px-4 py-3 border border-slate-100 rounded-xl text-left text-sm font-medium transition-all group relative cursor-pointer"
            :class="[
              isFieldLocked(item.type)
                ? 'opacity-75 bg-slate-50/65 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300'
                : 'hover:ring-2 hover:ring-teal-500 hover:bg-teal-50/10 text-slate-700',
            ]">
            <div
              class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 transition-colors flex-shrink-0"
              :class="[
                isFieldLocked(item.type)
                  ? 'bg-slate-100 text-slate-400'
                  : 'group-hover:bg-teal-100/60 group-hover:text-teal-700',
              ]">
              <img
                v-svg-inline
                :src="item.icon"
                :alt="item.label"
                class="w-4 h-4 transition-colors fill-current"
                :class="[isFieldLocked(item.type) ? 'text-slate-400' : 'text-slate-500 group-hover:text-teal-600']" />
            </div>

            <!-- Wrapping Flex Container (forces badge to wrap only when space is tight) -->
            <div class="flex-grow flex flex-row flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
              <span
                :class="isFieldLocked(item.type) ? 'text-slate-400 font-normal' : 'text-slate-700'"
                class="leading-tight">
                {{ item.label }}
              </span>

              <!-- Premium Red-to-Orange Pro Badge with Lock -->
              <span
                v-if="isFieldLocked(item.type)"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm uppercase tracking-wider scale-90 flex-shrink-0 origin-left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-2.2 h-2.2">
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clip-rule="evenodd" />
                </svg>
                Pro
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <section
      class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm h-[600px] lg:h-full lg:max-h-[calc(100vh-210px)] flex flex-col overflow-hidden">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Form Preview</h3>
        <span v-if="formFieldSetting.fields.length > 0" class="text-xs text-teal-600 font-medium"
          >Click on a field to edit it</span
        >
      </div>

      <div class="p-5 overflow-y-auto flex-1 scrollbar-thin">
        <form @submit.prevent :style="cssVars" class="space-y-5 gform-wrapper w-fit min-w-full">
          <!-- Loading Form Preview Skeleton -->
          <template v-if="isLoading">
            <div
              v-for="i in 3"
              :key="i"
              class="p-4 border border-slate-100 rounded-xl bg-white animate-pulse space-y-2.5">
              <div class="h-4 w-24 bg-slate-200 rounded"></div>
              <div class="h-10 w-full bg-slate-100 rounded border border-slate-200/50"></div>
            </div>
            <div class="flex justify-end pt-2">
              <div class="h-10 w-24 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
          </template>

          <!-- Real Loaded Fields State -->
          <template v-else>
            <div
              v-if="formFieldSetting.fields.length === 0"
              class="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400 flex flex-col items-center">
              <img
                v-svg-inline
                src="@/assets/icons/dashboardpage/add-circle-line.svg"
                class="w-10 h-10 text-teal-600" />
              <h4 class="font-semibold text-sm text-slate-700 mb-1">Your Form is Empty</h4>
              <p class="text-xs max-w-[240px]">
                Click on any field in the Field Library on the left to add it to your form.
              </p>
            </div>
            <div
              v-for="(field, index) in formFieldSetting.fields"
              :key="field.id"
              :id="'field-' + field.id"
              @click.stop="selectField(field.id)"
              :draggable="isDraggable"
              @dragstart="onDragStart(index, $event)"
              @dragover="onDragOver(index, $event)"
              @dragleave="onDragLeave"
              @drop="onDrop(index)"
              @dragend="onDragEnd"
              class="p-4 border rounded-xl relative cursor-pointer transition-all duration-200"
              :class="[
                formFieldSetting.selectedFieldId === field.id
                  ? 'border-l-[3px] border-teal-600 border-t-slate-200 border-r-slate-200 border-b-slate-200 bg-slate-50 shadow-sm rounded-l-none'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-teal-100/10',
                dragOverIndex === index ? 'border-t-2 border-t-teal-600 scale-[0.98]' : '',
                draggedIndex === index
                  ? 'bg-teal-50/40 opacity-75 border-2 border-dashed border-teal-500 shadow-inner'
                  : '',
              ]">
              <div
                v-if="formFieldSetting.selectedFieldId === field.id"
                class="flex items-center justify-end gap-1.5 mb-1">
                <button
                  type="button"
                  v-if="formFieldSetting.fields.length > 1"
                  @mousedown="
                    isDraggable = true;
                    selectField(field.id);
                  "
                  @mouseup="isDraggable = false"
                  @mouseleave="isDraggable = false"
                  class="drag-handle w-7 h-7 rounded-lg bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors text-amber-400"
                  :class="isDraggable ? 'cursor-grabbing' : 'cursor-grab'"
                  title="Drag to reorder">
                  <img
                    v-svg-inline
                    src="@/assets/icons/form-settings/drag-drop.svg"
                    class="w-4 h-4 text-teal-600 pointer-events-none"
                    draggable="false" />
                </button>

                <button
                  type="button"
                  @click.stop="duplicateField(field.id)"
                  class="w-7 h-7 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors text-blue-400 cursor-pointer"
                  title="Duplicate Field">
                  <img v-svg-inline src="@/assets/icons/form-list/clone.svg" class="w-4! h-4!" />
                </button>

                <button
                  type="button"
                  @click.stop="triggerDeleteConfirm(field.id, field.label)"
                  class="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors text-red-500 hover:text-red-400 cursor-pointer"
                  title="Delete Field">
                  <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-4 h-4" />
                </button>
              </div>

              <div
                class="space-y-1.5"
                v-if="['text', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)">
                <div class="relative" style="width: var(--input-width)">
                  <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                  <InputField
                    disable
                    :required="field.required"
                    :label="field.label"
                    :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                    :label-style="labelStyleObject"
                    :type="field.type === 'name' ? 'text' : field.type"
                    :placeholder="field.placeholder"
                    :modelValue="field.defaultValue"
                    :helpMessage="field.helpMessage"
                    :classes="field.type === 'password' && field.showPasswordIcon == 1 ? 'pr-10' : ''"
                    class="pointer-events-none">
                    <div
                      v-if="field.type === 'password' && field.showPasswordIcon == 1"
                      class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                      <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-400" />
                    </div>
                  </InputField>
                </div>
              </div>

              <div class="space-y-1.5" v-else-if="field.type === 'name'">
                <template v-if="field.nameFormat === 'split'">
                  <div class="grid grid-cols-2 gap-3 w-full" style="width: var(--input-width)">
                    <div class="relative w-full">
                      <HelpTooltip :message="field.firstNameHelpMessage" class="absolute top-0.5 right-1 z-10" />
                      <InputField
                        disable
                        :required="field.firstNameRequired == 1"
                        :label="field.firstNameLabel"
                        :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                        :label-style="labelStyleObject"
                        type="text"
                        :placeholder="field.firstNamePlaceholder"
                        :modelValue="field.firstNameDefaultValue"
                        :helpMessage="field.firstNameHelpMessage"
                        class="pointer-events-none" />
                    </div>
                    <div class="relative w-full">
                      <HelpTooltip :message="field.lastNameHelpMessage" class="absolute top-0.5 right-1 z-10" />
                      <InputField
                        disable
                        :required="field.lastNameRequired == 1"
                        :label="field.lastNameLabel"
                        :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                        :label-style="labelStyleObject"
                        type="text"
                        :placeholder="field.lastNamePlaceholder"
                        :modelValue="field.lastNameDefaultValue"
                        :helpMessage="field.lastNameHelpMessage"
                        class="pointer-events-none" />
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div style="width: var(--input-width)" class="relative w-full">
                    <HelpTooltip :message="field.lastNameHelpMessage" class="absolute top-0.5 right-1 z-10" />
                    <InputField
                      disable
                      :required="field.required"
                      :label="field.label"
                      :labelClass="labelPositionClass(field.labelPlacement) + ' block w-full'"
                      :label-style="labelStyleObject"
                      type="text"
                      :placeholder="field.placeholder"
                      :modelValue="field.defaultValue"
                      :helpMessage="field.helpMessage"
                      class="pointer-events-none" />
                  </div>
                </template>
              </div>

              <div class="space-y-1.5 relative" v-else-if="field.type === 'textarea'" style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <TextareaField
                  :required="field.required"
                  :label="field.label"
                  :label-class="labelPositionClass(field.labelPlacement) + ' block w-full'"
                  :label-style="labelStyleObject"
                  :placeholder="field.placeholder"
                  :model-value="field.defaultValue"
                  :rows="field.rows"
                  textareaClass="h-auto"
                  class="pointer-events-none" />
              </div>

              <div
                class="space-y-1.5 relative"
                v-else-if="['dropdown', 'multiselect'].includes(field.type)"
                style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <label
                  class="block text-sm font-semibold text-gray-700 pointer-events-none select-none gform-label mb-1"
                  :class="labelPositionClass(field.labelPlacement)"
                  :style="labelStyleObject">
                  {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <SelectField
                  :placeholder="field.placeholder || 'Select an option'"
                  :modelValue="field.placeholder || 'Select an option'"
                  :options="
                    Object.fromEntries([field.placeholder || ' ', ...(field.options || [])].map((opt) => [opt, opt]))
                  "
                  class="pointer-events-none" />
              </div>

              <div class="space-y-1.5 relative" v-else-if="field.type === 'radio'" style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <label
                  class="block text-sm font-semibold text-slate-700 pointer-events-none select-none gform-label mb-1"
                  :class="labelPositionClass(field.labelPlacement)"
                  :style="labelStyleObject">
                  {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div class="flex flex-col gap-1 px-3" :style="optionStyle">
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

              <div class="space-y-1.5" v-else-if="field.type === 'checkboxes'" style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <label
                  class="block text-sm font-semibold text-slate-700 pointer-events-none select-none gform-label mb-1"
                  :class="labelPositionClass(field.labelPlacement)"
                  :style="labelStyleObject">
                  {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div class="flex flex-col gap-1 px-3" :style="optionStyle">
                  <CustomDefaultCheckbox
                    v-for="opt in field.options"
                    :key="opt"
                    :label="opt"
                    class="pointer-events-none"
                    size="sm"
                    labelClass="text-sm text-gray-700 py-0.5" 
                    />
                </div>
              </div>

              <div class="space-y-1.5" v-else-if="field.type === 'datepicker'" style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <label
                  class="block text-sm font-semibold text-slate-700 gform-label mb-1"
                  :class="labelPositionClass(field.labelPlacement)"
                  :style="labelStyleObject">
                  {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div class="relative w-full">
                  <input
                    disabled
                    type="date"
                    class="gform-input w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10 gform-placeholder">
                    {{ field.placeholder }}
                  </span>
                  <img
                    v-svg-inline
                    src="@/assets/icons/FormFields/Calender.svg"
                    class="w-4 h-4 text-slate-400 pointer-events-none"
                    style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" />
                </div>
              </div>

              <div
                class="space-y-1.5 relative"
                v-else-if="field.type === 'timepicker'"
                style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <label
                  class="block text-sm font-semibold text-slate-700 gform-label mb-1"
                  :class="labelPositionClass(field.labelPlacement)"
                  :style="labelStyleObject">
                  {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div class="relative w-full">
                  <input
                    disabled
                    type="time"
                    class="gform-input w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10 gform-placeholder">
                    {{ field.placeholder || "Select Time" }}
                  </span>
                  <img
                    v-svg-inline
                    src="@/assets/icons/FormFields/timer.svg"
                    class="w-4 h-4 text-slate-400 pointer-events-none"
                    style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%)" />
                </div>
              </div>

              <div
                class="space-y-1.5 relative"
                v-else-if="field.type === 'fileupload'"
                style="width: var(--input-width)">
                <HelpTooltip :message="field.helpMessage" class="absolute top-0.5 right-1 z-10" />
                <label
                  class="block text-sm font-semibold text-slate-700 gform-label mb-1"
                  :class="labelPositionClass(field.labelPlacement)"
                  :style="labelStyleObject">
                  {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div
                  class="gform-input border-2 border-dashed border-slate-200 rounded-xl !h-auto !py-5 px-4 flex flex-col items-center justify-center bg-slate-50/50">
                  <img
                    v-svg-inline
                    src="@/assets/icons/FormFields/Upload.svg"
                    class="w-5 h-5 shrink-0 text-slate-600 mb-1.5" />
                  <span class="text-xs text-slate-500 gform-placeholder">{{ field.placeholder }}</span>
                </div>
              </div>

              <div
                class="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-100/50 flex items-center justify-between text-slate-500"
                v-else-if="field.type === 'hidden'">
                <div class="flex items-center gap-2">
                  <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-600" />
                  <span class="text-xs font-semibold uppercase tracking-wider">Hidden Field</span>
                </div>
                <span class="text-xs font-medium"
                  >{{ field.label }}<span v-if="field.defaultValue"> — {{ field.defaultValue }}</span></span
                >
              </div>
            </div>

            <div
              v-if="formFieldSetting.fields.length > 0"
              @click.stop="selectField('submit-button')"
              :class="submitButtonContainerClass"
              title="Click to edit button settings">
              <button disabled type="button" :class="[submitButtonClass, 'gform-submit-btn']">
                {{ formFieldSetting.submitButtonText || "Submit" }}
              </button>
            </div>
          </template>
        </form>
      </div>
    </section>

    <section
      class="settings-panel lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm h-[420px] lg:h-auto flex flex-col overflow-hidden lg:sticky lg:top-[80px] lg:max-h-[calc(100vh-210px)]">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Field Settings</h3>
      </div>

      <div class="px-5 overflow-y-auto flex-1 scrollbar-thin">
        <!-- Loading Settings Panel Skeleton -->
        <div v-if="isLoading" class="space-y-5 my-5 animate-pulse">
          <div class="space-y-2">
            <div class="h-4 w-20 bg-slate-200 rounded"></div>
            <div class="h-10 w-full bg-slate-100 rounded border border-slate-200/50"></div>
          </div>
          <div class="space-y-2">
            <div class="h-4 w-24 bg-slate-200 rounded"></div>
            <div class="h-10 w-full bg-slate-100 rounded border border-slate-200/50"></div>
          </div>
          <div class="space-y-2">
            <div class="h-4 w-16 bg-slate-200 rounded"></div>
            <div class="h-10 w-full bg-slate-100 rounded border border-slate-200/50"></div>
          </div>
        </div>

        <!-- Real Loaded Field Settings Panel -->
        <template v-else>
          <div v-if="formFieldSetting.selectedFieldId === 'submit-button'" class="space-y-4 my-5">
            <div>
              <InputField
                type="text"
                v-model="formFieldSetting.submitButtonText"
                label="Button Text"
                placeholder="Submit"
                focusColor="teal" />
            </div>

            <div>
              <RadioTypeSelector
                v-model="formFieldSetting.submitButtonSize"
                label="Button Size"
                name="submitButtonSize"
                :columns="3"
                width="full"
                :options="[
                  { label: 'Small', value: 'sm' },
                  { label: 'Medium', value: 'md' },
                  { label: 'Large', value: 'lg' },
                ]" />
            </div>

            <div v-if="formFieldSetting.submitButtonSize !== 'lg'">
              <RadioTypeSelector
                v-model="formFieldSetting.submitButtonPlacement"
                label="Button Alignment"
                name="submitButtonPlacement"
                :columns="3"
                width="full"
                :options="[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]" />
            </div>
            <div class="border border-slate-200 rounded-xl overflow-hidden -mx-1">
              <button
                type="button"
                @click="toggleAdvanceSettings"
                class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <span class="text-sm font-semibold text-gray-700">Advance Settings</span>
                <span
                  class="inline-flex items-center justify-center transition-transform duration-200"
                  :class="{ 'rotate-180': isAdvanceSettingsOpen }">
                  <img
                    v-svg-inline
                    src="@/assets/icons/form-settings/arrow-down-s-line.svg"
                    alt="Toggle Arrow"
                    class="w-5 h-5 text-slate-400" />
                </span>
              </button>

              <div v-if="isAdvanceSettingsOpen" class="p-4 space-y-4 bg-white">
                <div>
                  <InputField
                    type="text"
                    v-model="formFieldSetting.submitButtonContainerClass"
                    label="Container Class"
                    focusColor="teal" />
                </div>

                <div>
                  <InputField
                    type="text"
                    v-model="formFieldSetting.submitButtonElementClass"
                    label="Element Class"
                    focusColor="teal" />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="selectedField" class="space-y-4 my-5">
            <template v-if="selectedField.type === 'name'">
              <RadioTypeSelector
                v-model="selectedField.nameFormat"
                label="Name Format"
                helpMessage="Choose whether to collect the full name or separate First and Last Name."
                name="nameFormat"
                width="full"
                :columns="2"
                :options="[
                  { label: 'Full Name', value: 'single' },
                  { label: 'Split Name', value: 'split' },
                ]" />
            </template>
            <template v-if="selectedField.type === 'name' && selectedField.nameFormat === 'split'">
              <!-- 1. First Name Settings Collapsible -->
              <div class="border border-slate-200 rounded-xl overflow-hidden -mx-1 mb-4">
                <button
                  type="button"
                  @click="toggleFirstNameSettings"
                  class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <span class="text-sm font-semibold text-gray-700">First Name Settings</span>
                  <span
                    class="inline-flex items-center justify-center transition-transform duration-200"
                    :class="{ 'rotate-180': isFirstNameSettingsOpen }">
                    <img
                      v-svg-inline
                      src="@/assets/icons/form-settings/arrow-down-s-line.svg"
                      alt="Toggle Arrow"
                      class="w-5 h-5 text-slate-400" />
                  </span>
                </button>

                <div v-if="isFirstNameSettingsOpen" class="p-4 space-y-4 bg-white border-t border-slate-100">
                  <div>
                    <InputField
                      type="text"
                      v-model="selectedField.firstNameLabel"
                      label="First Name Label"
                      focusColor="teal" />
                  </div>
                  <div>
                    <InputField
                      type="text"
                      v-model="selectedField.firstNamePlaceholder"
                      label="First Name Placeholder"
                      focusColor="teal" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Required</label>
                    <div class="flex gap-2">
                      <CustomDefaultRadio
                        id="first-required-yes"
                        name="firstRequired"
                        :value="1"
                        label="Yes"
                        v-model="selectedField.firstNameRequired" />
                      <CustomDefaultRadio
                        id="first-required-no"
                        name="firstRequired"
                        :value="0"
                        label="No"
                        v-model="selectedField.firstNameRequired" />
                    </div>
                  </div>
                  <div v-if="selectedField.firstNameRequired">
                    <InputField
                      type="text"
                      v-model="selectedField.firstNameRequiredMessage"
                      label="Required Message"
                      focusColor="teal" />
                  </div>
                </div>
              </div>

              <!-- 2. Last Name Settings Collapsible -->
              <div class="border border-slate-200 rounded-xl overflow-hidden -mx-1">
                <button
                  type="button"
                  @click="toggleLastNameSettings"
                  class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <span class="text-sm font-semibold text-gray-700">Last Name Settings</span>
                  <span
                    class="inline-flex items-center justify-center transition-transform duration-200"
                    :class="{ 'rotate-180': isLastNameSettingsOpen }">
                    <img
                      v-svg-inline
                      src="@/assets/icons/form-settings/arrow-down-s-line.svg"
                      alt="Toggle Arrow"
                      class="w-5 h-5 text-slate-400" />
                  </span>
                </button>

                <div v-if="isLastNameSettingsOpen" class="p-4 space-y-4 bg-white border-t border-slate-100">
                  <div>
                    <InputField
                      type="text"
                      v-model="selectedField.lastNameLabel"
                      label="Last Name Label"
                      focusColor="teal" />
                  </div>
                  <div>
                    <InputField
                      type="text"
                      v-model="selectedField.lastNamePlaceholder"
                      label="Last Name Placeholder"
                      focusColor="teal" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Required</label>
                    <div class="flex gap-2">
                      <CustomDefaultRadio
                        id="last-required-yes"
                        name="lastRequired"
                        :value="1"
                        label="Yes"
                        v-model="selectedField.lastNameRequired" />
                      <CustomDefaultRadio
                        id="last-required-no"
                        name="lastRequired"
                        :value="0"
                        label="No"
                        v-model="selectedField.lastNameRequired" />
                    </div>
                  </div>
                  <div v-if="selectedField.lastNameRequired">
                    <InputField
                      type="text"
                      v-model="selectedField.lastNameRequiredMessage"
                      label="Required Message"
                      focusColor="teal" />
                  </div>
                </div>
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
              <InputFieldWithBadge
                type="number"
                v-model="selectedField.rows"
                label="Rows"
                width="full"
                :min="1"
                badge='<svg class="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 9 12 3 6 9H18ZM18 15 12 21 6 15H18Z" fill="currentColor"></path></svg>' />
            </div>

            <div v-if="selectedField.type !== 'hidden'">
              <RadioTypeSelector
                v-model="selectedField.labelPlacement"
                label="Label Placement"
                name="labelPlacement"
                width="full"
                :columns="3"
                :options="[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]" />
            </div>

            <!-- 👇 Hide global required toggle when Name format is split -->
            <div
              v-if="
                selectedField.type !== 'hidden' &&
                !(selectedField.type === 'name' && selectedField.nameFormat === 'split')
              ">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Required</label>
              <div class="flex">
                <CustomDefaultRadio
                  id="required-yes"
                  name="required"
                  :value="1"
                  label="Yes"
                  v-model="selectedField.required" />
                <CustomDefaultRadio
                  id="required-no"
                  name="required"
                  :value="0"
                  label="No"
                  v-model="selectedField.required" />
              </div>
            </div>

            <!-- 👇 Hide global required message when Name format is split -->
            <div
              v-if="selectedField.required && !(selectedField.type === 'name' && selectedField.nameFormat === 'split')">
              <InputField
                type="text"
                v-model="selectedField.requiredMessage"
                label="Required message"
                focusColor="teal" />
            </div>

            <template v-if="selectedField.type === 'email'">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Validate Email</label>
                <div class="flex">
                  <CustomDefaultRadio
                    id="validate-email-yes"
                    name="validateEmail"
                    :value="1"
                    label="Yes"
                    v-model="selectedField.validateEmail" />
                  <CustomDefaultRadio
                    id="validate-email-no"
                    name="validateEmail"
                    :value="0"
                    label="No"
                    v-model="selectedField.validateEmail" />
                </div>
              </div>
              <div v-if="selectedField.validateEmail">
                <InputField
                  type="text"
                  v-model="selectedField.emailErrorMessage"
                  label="Error message"
                  focusColor="teal" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Unique Email Address</label>
                <div class="flex">
                  <CustomDefaultRadio
                    id="unique-email-yes"
                    name="uniqueEmail"
                    :value="1"
                    label="Yes"
                    v-model="selectedField.uniqueEmail" />
                  <CustomDefaultRadio
                    id="unique-email-no"
                    name="uniqueEmail"
                    :value="0"
                    label="No"
                    v-model="selectedField.uniqueEmail" />
                </div>
              </div>
              <div v-if="selectedField.uniqueEmail">
                <InputField
                  type="text"
                  v-model="selectedField.uniqueEmailErrorMessage"
                  label="Unique error message"
                  focusColor="teal" />
              </div>
            </template>
            <template v-if="selectedField.type === 'password'">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Show Visibility Icon</label>
                <div class="flex">
                  <CustomDefaultRadio
                    id="show-password-icon-yes"
                    name="showPasswordIcon"
                    :value="1"
                    label="Yes"
                    v-model="selectedField.showPasswordIcon" />
                  <CustomDefaultRadio
                    id="show-password-icon-no"
                    name="showPasswordIcon"
                    :value="0"
                    label="No"
                    v-model="selectedField.showPasswordIcon" />
                </div>
              </div>
            </template>

            <div v-if="['radio', 'checkboxes', 'dropdown', 'multiselect'].includes(selectedField.type)">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-semibold text-gray-700">Options</label>
                <button
                  type="button"
                  @click="addOption(selectedField)"
                  class="text-xs font-medium text-teal-600 border border-dashed border-teal-300 hover:border-teal-500 hover:bg-teal-50/50 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer">
                  <img v-svg-inline src="@/assets/icons/dashboardpage/add-circle-line.svg" class="w-3.5 h-3.5" />
                  Add Option
                </button>
              </div>

              <div class="space-y-2">
                <div
                  v-for="(opt, idx) in selectedField.options"
                  :key="idx"
                  :draggable="isOptionDraggable"
                  @dragstart="onOptionDragStart(idx, $event)"
                  @dragover="onOptionDragOver(idx, $event)"
                  @dragleave="onOptionDragLeave"
                  @drop="onOptionDrop(selectedField, idx)"
                  @dragend="onOptionDragEnd"
                  class="flex items-center gap-2 transition-all"
                  :class="draggedOptionIndex === idx ? 'opacity-50' : ''">
                  <InputField
                    type="text"
                    :modelValue="opt"
                    @update:modelValue="(val: string) => updateOption(selectedField, idx, val)"
                    focusColor="teal"
                    class="flex-1"
                    classes="!py-1.5" />

                  <button
                    type="button"
                    @mousedown="isOptionDraggable = true"
                    @mouseup="isOptionDraggable = false"
                    @mouseleave="isOptionDraggable = false"
                    :disabled="selectedField.options && selectedField.options.length <= 1"
                    class="w-8 h-8 flex-shrink-0 rounded-lg bg-teal-50 hover:bg-teal-100 flex items-center justify-center text-teal-600 cursor-grab active:cursor-grabbing transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Drag to reorder">
                    <img
                      v-svg-inline
                      src="@/assets/icons/form-settings/drag-drop.svg"
                      class="w-4 h-4 pointer-events-none" />
                  </button>

                  <button
                    type="button"
                    @click="removeOption(selectedField, idx)"
                    :disabled="selectedField.options && selectedField.options.length <= 1"
                    class="w-8 h-8 flex-shrink-0 rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-red-500 transition-colors cursor-pointer"
                    title="Remove option">
                    <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Advance Settings Accordion -->
            <div class="border border-slate-200 rounded-xl overflow-hidden -mx-1">
              <button
                type="button"
                @click="toggleAdvanceSettings"
                class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <span class="text-sm font-semibold text-gray-700">Advance Settings</span>
                <span
                  class="inline-flex items-center justify-center transition-transform duration-200"
                  :class="{ 'rotate-180': isAdvanceSettingsOpen }">
                  <img
                    v-svg-inline
                    src="@/assets/icons/form-settings/arrow-down-s-line.svg"
                    alt="Toggle Arrow"
                    class="w-5 h-5 text-slate-400" />
                </span>
              </button>

              <div v-if="isAdvanceSettingsOpen" class="p-4 space-y-4 bg-white">
                <!-- 1. Radio Toggle Selector for Split Name fields -->
                <div v-if="selectedField.type === 'name' && selectedField.nameFormat === 'split'" class="mb-4">
                  <RadioTypeSelector
                    v-model="activeNameSubField"
                    label="Configure Sub-field"
                    name="activeNameSubField"
                    width="full"
                    :columns="2"
                    :options="[
                      { label: 'First Name', value: 'first' },
                      { label: 'Last Name', value: 'last' },
                    ]" />
                </div>

                <!-- 2. Default Value Input -->
                <div v-if="canHaveDefaultValue(selectedField)">
                  <template
                    v-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'first'
                    ">
                    <InputField
                      type="text"
                      v-model="selectedField.firstNameDefaultValue"
                      label="First Name Default Value"
                      focusColor="teal" />
                  </template>
                  <template
                    v-else-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'last'
                    ">
                    <InputField
                      type="text"
                      v-model="selectedField.lastNameDefaultValue"
                      label="Last Name Default Value"
                      focusColor="teal" />
                  </template>
                  <template v-else>
                    <InputField
                      type="text"
                      v-model="selectedField.defaultValue"
                      label="Default Value"
                      focusColor="teal" />
                  </template>
                </div>

                <!-- 3. Max Text Length Input -->
                <div v-if="canHaveMaxLength(selectedField)">
                  <template
                    v-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'first'
                    ">
                    <InputFieldWithBadge
                      type="number"
                      v-model.number="selectedField.firstNameMaxLength"
                      label="First Name Max Length"
                      width="full"
                      :min="1"
                      badge='<svg class="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 9 12 3 6 9H18ZM18 15 12 21 6 15H18Z" fill="currentColor"></path></svg>' />
                  </template>
                  <template
                    v-else-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'last'
                    ">
                    <InputFieldWithBadge
                      type="number"
                      v-model.number="selectedField.lastNameMaxLength"
                      label="Last Name Max Length"
                      width="full"
                      :min="1"
                      badge='<svg class="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 9 12 3 6 9H18ZM18 15 12 21 6 15H18Z" fill="currentColor"></path></svg>' />
                  </template>
                  <template v-else>
                    <InputFieldWithBadge
                      type="number"
                      v-model.number="selectedField.maxLength"
                      label="Max Text Length"
                      width="full"
                      :min="1"
                      badge='<svg class="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 9 12 3 6 9H18ZM18 15 12 21 6 15H18Z" fill="currentColor"></path></svg>' />
                  </template>
                </div>

                <!-- 4. Container Class Input -->
                <div>
                  <template
                    v-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'first'
                    ">
                    <InputField
                      type="text"
                      v-model="selectedField.firstNameContainerClass"
                      label="First Name Container Class"
                      focusColor="teal" />
                  </template>
                  <template
                    v-else-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'last'
                    ">
                    <InputField
                      type="text"
                      v-model="selectedField.lastNameContainerClass"
                      label="Last Name Container Class"
                      focusColor="teal" />
                  </template>
                  <template v-else>
                    <InputField
                      type="text"
                      v-model="selectedField.containerClass"
                      label="Container Class"
                      focusColor="teal" />
                  </template>
                </div>

                <!-- 5. Field Class Input -->
                <div>
                  <template
                    v-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'first'
                    ">
                    <InputField
                      type="text"
                      v-model="selectedField.firstNameFieldClass"
                      label="First Name Field Class"
                      focusColor="teal" />
                  </template>
                  <template
                    v-else-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'last'
                    ">
                    <InputField
                      type="text"
                      v-model="selectedField.lastNameFieldClass"
                      label="Last Name Field Class"
                      focusColor="teal" />
                  </template>
                  <template v-else>
                    <InputField type="text" v-model="selectedField.fieldClass" label="Field Class" focusColor="teal" />
                  </template>
                </div>

                <!-- 6. Help Message Input -->
                <div>
                  <template
                    v-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'first'
                    ">
                    <TextareaField
                      v-model="selectedField.firstNameHelpMessage"
                      label="First Name Help Message"
                      :rows="3" />
                  </template>
                  <template
                    v-else-if="
                      selectedField.type === 'name' &&
                      selectedField.nameFormat === 'split' &&
                      activeNameSubField === 'last'
                    ">
                    <TextareaField
                      v-model="selectedField.lastNameHelpMessage"
                      label="Last Name Help Message"
                      :rows="3" />
                  </template>
                  <template v-else>
                    <TextareaField v-model="selectedField.helpMessage" label="Help Message" :rows="3" />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center text-center py-16">
            <div class="w-14 h-14 rounded-full bg-slate-100/80 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6 text-slate-500">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3.5l7.5 4.3v8.6L12 20.7l-7.5-4.3V7.8L12 3.5z" />
                <circle cx="12" cy="12" r="2.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <p class="text-sm text-slate-500 font-medium max-w-[240px] leading-relaxed">
              Select a field to configure its settings
            </p>
          </div>
        </template>
      </div>
    </section>
  </div>
  <DeleteFieldConfirmModal
    :isDeleteModalOpen="isDeleteModalOpen"
    :fieldLabel="fieldToDeleteLabel"
    @close="isDeleteModalOpen = false"
    @confirm="confirmDelete" />

  <UpdatePlanModal :isShowModal="isUpgradeModalOpen" @closeModal="isUpgradeModalOpen = false" />
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import DeleteFieldConfirmModal from "@/components/modals/DeleteFieldConfirmModal.vue";
  import UpdatePlanModal from "@/components/modals/UpdatePlanModal.vue";
  import { useFormFieldsBuilder } from "@/composable/useFormFieldBuilder";
  defineProps<{
    isLoading?: boolean;
  }>();
  // Modal toggle state
  const isUpgradeModalOpen = ref(false);
  const openUpgradeModal = () => {
    isUpgradeModalOpen.value = true;
  };

  const activeNameSubField = ref<"first" | "last">("first");
  const isFirstNameSettingsOpen = ref(false);
  const isLastNameSettingsOpen = ref(false);
  const toggleFirstNameSettings = () => {
    isFirstNameSettingsOpen.value = !isFirstNameSettingsOpen.value;
    if (isFirstNameSettingsOpen.value) {
      isLastNameSettingsOpen.value = false;
      isAdvanceSettingsOpen.value = false;
    }
  };
  // 2. Toggle Last Name panel (closes First Name and Advance Settings)
  const toggleLastNameSettings = () => {
    isLastNameSettingsOpen.value = !isLastNameSettingsOpen.value;
    if (isLastNameSettingsOpen.value) {
      isFirstNameSettingsOpen.value = false;
      isAdvanceSettingsOpen.value = false;
    }
  };
  const {
    fieldLibrary,
    formFieldSetting,
    selectedField,
    selectField,
    isDeleteModalOpen,
    fieldToDeleteLabel,
    triggerDeleteConfirm,
    confirmDelete,
    addField,
    labelPositionClass,
    duplicateField,
    addOption,
    updateOption,
    removeOption,
    draggedIndex,
    dragOverIndex,
    isDraggable,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    draggedOptionIndex,
    isOptionDraggable,
    onOptionDragStart,
    onOptionDragOver,
    onOptionDragLeave,
    onOptionDrop,
    onOptionDragEnd,
    submitButtonContainerClass,
    submitButtonClass,
    isAdvanceSettingsOpen,
    toggleAdvanceSettings,
    canHaveDefaultValue,
    canHaveMaxLength,
    labelStyleObject,
    cssVars,
    optionStyle,
    isFieldLocked,
  } = useFormFieldsBuilder();
  watch(isAdvanceSettingsOpen, (isOpen) => {
    if (isOpen) {
      isFirstNameSettingsOpen.value = false;
      isLastNameSettingsOpen.value = false;
    }
  });
</script>

<style scoped>
  input[type="date"]::-webkit-datetime-edit,
  input[type="time"]::-webkit-datetime-edit {
    color: transparent !important;
  }

  .settings-panel :deep(.discount-type-radio-toggle label) {
    padding-left: 0 !important;
  }

  .gform-wrapper {
    background-color: transparent !important;
  }
:deep(.gform-wrapper .discount-type-radio-toggle label) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>

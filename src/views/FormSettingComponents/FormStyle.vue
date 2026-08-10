<template>
  <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
    <!-- Left Panel -->
    <section class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <!-- Form Information Card -->
      <div class="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
        <InputField
          v-model="formStyleSetting.formInfo.formTitle"
          label="Form Title"
          type="text"
          focusColor="teal"
          placeholder="Enter form title"
        />
        <TextareaField
          ref="textareaRef"
          v-model="formStyleSetting.formInfo.formDescription"
          label="Form Description"
          :rows="2"
          textareaClass="!h-20 resize-none"
          placeholder="Enter form description"
        />
      </div>

      <!-- Label Style -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="toggleSection('labelStyle')"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="activeSection === 'labelStyle' ? 'rounded-t-xl' : 'rounded-xl'">
          <span>Label Style</span>
          <span 
            class="inline-flex items-center justify-center transition-transform duration-200"
            :class="{ 'rotate-180': activeSection === 'labelStyle' }">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
              alt="Toggle Arrow" 
              class="w-5 h-5 text-slate-400"
            />
          </span>
        </button>

        <div v-show="activeSection === 'labelStyle'" class="p-4 space-y-4 bg-white rounded-b-xl">
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Display</label>
            <RadioTypeSelector
              v-model="formStyleSetting.labelStyle.showLabel"
              :options="displayOptions"
              :columns="2"
              name="display-selector"
            /> 
          </div>
          
          <!-- Text Color -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Text Color</label>
            <InputColorPicker v-model="formStyleSetting.labelStyle.textColor" />
          </div>

          <!-- Font Size -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Size</label>
            <InputFieldWithBadge
              ref="fontSizeRef"
              v-model="formStyleSetting.labelStyle.fontSize"
              type="number"
              badge="PX"
              width="w-[80px]"
              :min="1"
            />
          </div>

          <!-- Font Weight -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Weight</label>
            <SelectField 
              v-model="formStyleSetting.labelStyle.fontWeight" 
              :options="fontWeightOptions" 
              class="flex-1" 
            />
          </div>
        </div>
      </div>

      <!-- Input Style -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="toggleSection('inputStyle')"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="activeSection === 'inputStyle' ? 'rounded-t-xl' : 'rounded-xl'">
          <span>Input Style</span>
          <span 
            class="inline-flex items-center justify-center transition-transform duration-200"
            :class="{ 'rotate-180': activeSection === 'inputStyle' }">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
              alt="Toggle Arrow" 
              class="w-5 h-5 text-slate-400"/>
          </span>
        </button>
        <div v-show="activeSection === 'inputStyle'" class="p-4 space-y-4 bg-white rounded-b-xl">
          <!-- Field Width -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Field Width</label>
            <SelectField 
              v-model="formStyleSetting.inputStyle.inputWidth" 
              :options="fieldWidthOptions" 
              class="flex-1" 
            />
          </div>
          <!-- Field Size -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Field Size</label>
            <SelectField 
              v-model="formStyleSetting.inputStyle.inputSize" 
              :options="fieldSizeOptions" 
              class="flex-1" 
            />
          </div>
          <!-- Box Shadow -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 sm:w-28 flex-shrink-0">Box Shadow</label>
            <div class="grid grid-cols-2 sm:flex sm:items-center gap-3 min-w-0 w-full">
              <!-- X Offset -->
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputBoxShadowX"
                type="number"
                badge="X"
                width="full"
                :min="-100"
                :max="100"
              />
              <!-- Y Offset -->
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputBoxShadowY"
                type="number"
                badge="Y"
                width="full"
                :min="-100"
                :max="100"
              />
              <!-- Blur -->
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputBoxShadowBlur"
                type="number"
                badge="Blur"
                width="full"
                :min="0"
                :max="100"
              />
              <!-- Opacity -->
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputBoxShadowOpacity"
                type="number"
                badge="Opacity"
                width="full"
                :min="0"
                :max="100"
              />
              <!-- Color Picker -->
              <div class="flex-shrink-0 flex items-center">
                <InputColorPicker v-model="formStyleSetting.inputStyle.inputBoxShadowColor" />
              </div>
            </div>
          </div>
          <!-- Font Size -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Size</label>
            <InputFieldWithBadge
              v-model="formStyleSetting.inputStyle.inputFontSize"
              type="number"
              badge="PX"
              width="w-25"
              :min="1"
            />
          </div>
          <!-- Font Weight -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Weight</label>
            <SelectField 
              v-model="formStyleSetting.inputStyle.inputFontWeight" 
              :options="fontWeightOptions" 
              class="flex-1" 
            />
          </div>
          <!-- Padding -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Padding <span class="text-[10px]">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputPaddingTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputPaddingRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputPaddingBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputPaddingLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Margin -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Margin <span class="text-[10px]">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputMarginTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputMarginRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputMarginBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputMarginLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Border Style -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Border Style</label>
            <SelectField 
              v-model="formStyleSetting.inputStyle.inputBorderStyle" 
              :options="borderStyleOptions" 
              class="flex-1" 
            />
          </div>
          <!-- Row: Border Width & Border Radius -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Border Width -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Width</label>
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputBorderWidth"
                type="number"
                badge="PX"
                width="full"
                :min="0"
                :max="10"
              />
            </div>
            <!-- Border Radius -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Radius</label>
              <InputFieldWithBadge
                v-model="formStyleSetting.inputStyle.inputBorderRadius"
                type="number"
                badge="PX"
                width="full"
                :min="0"
              />
            </div>
          </div>
          <!-- Row 1: Background Color & Text Color -->
          <div class="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
            <!-- Background Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Background Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.inputStyle.inputBgColor" />
              </div>
            </div>
            <!-- Text Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Text Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.inputStyle.inputTextColor" />
              </div>
            </div>
          </div>
          <!-- Row 2: Border Color & Placeholder Color -->
          <div class="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
            <!-- Border Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.inputStyle.inputBorderColor" />
              </div>
            </div>
            <!-- Placeholder Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Placeholder Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.inputStyle.inputPlaceholderColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Button Style -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="toggleSection('buttonStyle')"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="activeSection === 'buttonStyle' ? 'rounded-t-xl' : 'rounded-xl'">
          <span>Button Style</span>
          <span 
            class="inline-flex items-center justify-center transition-transform duration-200"
            :class="{ 'rotate-180': activeSection === 'buttonStyle' }">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
              alt="Toggle Arrow" 
              class="w-5 h-5 text-slate-400"
            />
          </span>
        </button>
        <div v-show="activeSection === 'buttonStyle'" class="p-4 space-y-3 bg-white rounded-b-xl">
          <!-- Box Shadow -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 sm:w-28 flex-shrink-0">Box Shadow</label>
            <div class="grid grid-cols-2 sm:flex sm:items-center gap-3 min-w-0 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnBoxShadowX"
                type="number"
                badge="X"
                width="full"
                :min="-100"
                :max="100"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnBoxShadowY"
                type="number"
                badge="Y"
                width="full"
                :min="-100"
                :max="100"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnBoxShadowBlur"
                type="number"
                badge="Blur"
                width="full"
                :min="0"
                :max="100"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnBoxShadowOpacity"
                type="number"
                badge="Opacity"
                width="full"
                :min="0"
                :max="100"
              />
              <div class="flex-shrink-0 flex items-center">
                <InputColorPicker v-model="formStyleSetting.buttonStyle.btnBoxShadowColor" />
              </div>
            </div>
          </div>
          <!-- Font Size -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Size</label>
            <InputFieldWithBadge
              v-model="formStyleSetting.buttonStyle.btnFontSize"
              type="number"
              badge="PX"
              width="w-[80px]"
              :min="1"
            />
          </div>
          <!-- Font Weight -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Weight</label>
            <SelectField 
              v-model="formStyleSetting.buttonStyle.btnFontWeight" 
              :options="fontWeightOptions" 
              class="flex-1" 
            />
          </div>
          <!-- Padding  -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Padding <span class="text-xs font-normal text-slate-400 ml-0.5">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnPaddingTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnPaddingRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnPaddingBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnPaddingLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Margin -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Margin <span class="text-xs font-normal text-slate-400 ml-0.5">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnMarginTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnMarginRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnMarginBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnMarginLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Border Style -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Border Style</label>
            <SelectField 
              v-model="formStyleSetting.buttonStyle.btnBorderStyle" 
              :options="borderStyleOptions" 
              class="flex-1" 
            />
          </div>
          <!-- Row: Border Width & Border Radius -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Border Width -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Width</label>
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnBorderWidth"
                type="number"
                badge="PX"
                width="full"
                :min="0"
                :max="10"
              />
            </div>
            <!-- Border Radius -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Radius</label>
              <InputFieldWithBadge
                v-model="formStyleSetting.buttonStyle.btnBorderRadius"
                type="number"
                badge="PX"
                width="full"
                :min="0"
              />
            </div>
          </div>
          <!-- Button Background Color & Button Text Color -->
          <div class="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
            <!-- Button Background Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Background Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.buttonStyle.btnBgColor" />
              </div>
            </div>
            <!-- Button Text Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Text Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.buttonStyle.btnTextColor" />
              </div>
            </div>
          </div>
          <!-- Button Border Color -->
          <div class="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="formStyleSetting.buttonStyle.btnBorderColor" />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <!-- Form Style -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="toggleSection('formStyle')"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="activeSection === 'formStyle' ? 'rounded-t-xl' : 'rounded-xl'">
          <span>Form Style</span>
          <span 
            class="inline-flex items-center justify-center transition-transform duration-200"
            :class="{ 'rotate-180': activeSection === 'formStyle' }">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
              alt="Toggle Arrow" 
              class="w-5 h-5 text-slate-400"
            />
          </span>
        </button>
        <div v-show="activeSection === 'formStyle'" class="p-4 space-y-3 bg-white rounded-b-xl">
          <!-- Background Color -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Background Color</label>
            <InputColorPicker v-model="formStyleSetting.formStyle.formBgColor" />
          </div>
        </div>
      </div>

      <!-- Form Title Style -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="toggleSection('formTitleStyle')"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="activeSection === 'formTitleStyle' ? 'rounded-t-xl' : 'rounded-xl'">
          <span>Form Title Style</span>
          <span 
            class="inline-flex items-center justify-center transition-transform duration-200"
            :class="{ 'rotate-180': activeSection === 'formTitleStyle' }">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
              alt="Toggle Arrow" 
              class="w-5 h-5 text-slate-400"
            />
          </span>
        </button>
        <div v-show="activeSection === 'formTitleStyle'" class="p-4 space-y-3 bg-white rounded-b-xl">
          <!-- Text Color -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Text Color</label>
            <InputColorPicker v-model="formStyleSetting.formTitleStyle.formTitleTextColor" />
          </div>
          <!-- Padding -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Padding <span class="text-xs font-normal text-slate-400 ml-0.5">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitlePaddingTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitlePaddingRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitlePaddingBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitlePaddingLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Margin -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Margin <span class="text-xs font-normal text-slate-400 ml-0.5">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitleMarginTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitleMarginRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitleMarginBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formTitleStyle.formTitleMarginLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Font Size -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Size</label>
            <InputFieldWithBadge
              v-model="formStyleSetting.formTitleStyle.formTitleFontSize"
              type="number"
              badge="PX"
              width="w-[80px]"
              :min="1"
            />
          </div>
          <!-- Alignment -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Alignment</label>
            <RadioTypeSelector
              v-model="formStyleSetting.formTitleStyle.formTitleAlign"
              :options="alignOptions"
              :columns="3"
              name="title-align-selector"/>
          </div>
        </div>
      </div>

      <!-- Form Description Style -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="toggleSection('formDescStyle')"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="activeSection === 'formDescStyle' ? 'rounded-t-xl' : 'rounded-xl'">
          <span>Form Description Style</span>
          <span 
            class="inline-flex items-center justify-center transition-transform duration-200"
            :class="{ 'rotate-180': activeSection === 'formDescStyle' }">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
              alt="Toggle Arrow" 
              class="w-5 h-5 text-slate-400"
            />
          </span>
        </button>
        <div v-show="activeSection === 'formDescStyle'" class="p-4 space-y-3 bg-white rounded-b-xl">
          <!-- Text Color -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Text Color</label>
            <InputColorPicker v-model="formStyleSetting.formDescStyle.formDescTextColor" />
          </div>
          <!-- Padding -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Padding <span class="text-xs font-normal text-slate-400 ml-0.5">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescPaddingTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescPaddingRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescPaddingBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescPaddingLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Margin -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-slate-700 sm:w-28 flex-shrink-0 sm:pt-2.5">
              Margin <span class="text-xs font-normal text-slate-400 ml-0.5">(PX)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 flex-1 w-full">
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescMarginTop"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescMarginRight"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescMarginBottom"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
              <InputFieldWithBadge
                v-model="formStyleSetting.formDescStyle.formDescMarginLeft"
                type="number"
                badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
                width="full"
                labelPosition="bottom"
                :min="0"
              />
            </div>
          </div>
          <!-- Font Size -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Font Size</label>
            <InputFieldWithBadge
              v-model="formStyleSetting.formDescStyle.formDescFontSize"
              type="number"
              badge="PX"
              width="w-[80px]"
              :min="1"
            />
          </div>
          <!-- Alignment -->
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full xs:w-28 sm:w-28 flex-shrink-0">Alignment</label>
            <RadioTypeSelector
              v-model="formStyleSetting.formDescStyle.formDescAlign"
              :options="alignOptions"
              :columns="3"
              name="desc-align-selector"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Right Panel -->
    <section class="lg:col-span-6 w-full flex flex-col items-center bg-transparent border-none lg:bg-slate-100/50 lg:border lg:border-slate-200/60 rounded-2xl p-0 lg:p-8 min-h-0 lg:min-h-[400px] lg:sticky lg:top-24">
      <PreviewTemplate>
        <FormPreview />
      </PreviewTemplate>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { formSetting } from "@/composable/useFormSettings";
import { useFormStyleSettingStore } from "@/stores/formStyleStore";
import PreviewTemplate from "@/views/FormSettingComponents/PreviewTemplate.vue";
import FormPreview from "@/views/FormSettingComponents/FormPreview.vue";

import {
  displayOptions,
  fontWeightOptions,
  fieldWidthOptions,
  fieldSizeOptions,
  borderStyleOptions,
  alignOptions
} from "@/data/formStyleOptions";

const { formStyleSetting } =  formSetting();
const formStyleSettingStore = useFormStyleSettingStore();

// Declare props to receive the active state from the parent
const props = defineProps({
  active: Boolean
});

const activeSection = ref<string | null>(null);
const toggleSection = (name: string) => {
  activeSection.value = activeSection.value === name ? null : name;
};

// Ref for the TextareaField component
const textareaRef = ref<any>(null);

watch(
    formStyleSetting,
    (newVal) => {
      Object.assign(formStyleSettingStore.formStyleSetting, newVal);
    },
    { deep: true, immediate: true }
  );

// Watch the active prop and trigger focus when the step becomes active
watch(
  () => props.active,
  (isActive) => {
    if (isActive) {
      setTimeout(() => {
        textareaRef.value?.focus();
      }, 150);  
    }
  },
  { immediate: true }
);
</script>
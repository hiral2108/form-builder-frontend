<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
    <!-- Left Panel: Customization Settings (Col-span-6) -->
    <section class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      
      <!-- Form Information Card -->
      <div class="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
        <!-- Global InputField Component -->
        <InputField
          v-model="formTitle"
          label="Form Title"
          type="text"
          focusColor="teal"
          placeholder="Enter form title"
        />
        <!-- Global TextareaField Component -->
        <TextareaField
          ref="textareaRef"
          v-model="formDescription"
          label="Form Description"
          :rows="2"
          textareaClass="!h-20 resize-none"
          placeholder="Enter form description"
        />
      </div>

      <!-- Collapsible Label Style Card -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <button 
          @click="isLabelStyleOpen = !isLabelStyleOpen"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          :class="isLabelStyleOpen ? 'rounded-t-xl' : 'rounded-xl'"
        >
          <span>Label Style</span>
        <span 
          class="inline-flex items-center justify-center transition-transform duration-200"
          :class="{ 'rotate-180': isLabelStyleOpen }"
        >
          <img 
            v-svg-inline 
            src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
            alt="Toggle Arrow" 
            class="w-5 h-5 text-slate-400"
          />
        </span>
        </button>

        <div v-show="isLabelStyleOpen" class="p-4 space-y-4 bg-white rounded-b-xl">
          <!-- Display Toggle Option -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Display</label>
            <RadioTypeSelector
              v-model="showLabel"
              :options="displayOptions"
              :columns="2"
              name="display-selector"
            />
          </div>
          <!-- Text Color -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Text Color</label>
          <!-- Custom Swatch + Chrome Picker -->
          <InputColorPicker v-model="textColor" />
        </div>

          <!-- Font Size -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Font Size</label>
            <InputFieldWithBadge
              ref="fontSizeRef"
              v-model="fontSize"
              type="number"
              badge="PX"
              width="w-[80px]"
              :min="1"
            />
          </div>

          <!-- Font Weight -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Font Weight</label>
            <SelectField 
              v-model="fontWeight" 
              :options="fontWeightOptions" 
              class="flex-1" 
            />
          </div>
        </div>
      </div>

      <!-- Collapsible Input Card -->
    <div class="border border-slate-200 rounded-xl bg-white relative">
      <button 
        @click="isInputStyleOpen = !isInputStyleOpen"
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-700 cursor-pointer transition-colors"
        :class="isInputStyleOpen ? 'rounded-t-xl' : 'rounded-xl'"
      >
        <span>Input Style</span>
        <span 
          class="inline-flex items-center justify-center transition-transform duration-200"
          :class="{ 'rotate-180': isInputStyleOpen }"
        >
          <img 
            v-svg-inline 
            src="@/assets/icons/form-settings/arrow-down-s-line.svg" 
            alt="Toggle Arrow" 
            class="w-5 h-5 text-slate-400"
          />
        </span>
      </button>
      <div v-show="isInputStyleOpen" class="p-4 space-y-4 bg-white rounded-b-xl">
        <!-- Field Width -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Field Width</label>
          <SelectField 
            v-model="inputWidth" 
            :options="fieldWidthOptions" 
            class="flex-1" 
          />
        </div>
        <!-- Field Size -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Field Size</label>
          <SelectField 
            v-model="inputSize" 
            :options="fieldSizeOptions" 
            class="flex-1" 
          />
        </div>
          
        <!-- Box Shadow -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Box Shadow</label>
          <InputField
            v-model="inputBoxShadow"
            type="text"
            focusColor="teal"
            placeholder="e.g. 0 0 0 #000000"
            class="flex-1"
          />
        </div>
        <!-- Font Size -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Font Size</label>
          <InputFieldWithBadge
            v-model="inputFontSize"
            type="number"
            badge="PX"
            width="w-25"
            :min="1"
          />
        </div>
        <!-- Font Weight -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Font Weight</label>
          <SelectField 
            v-model="inputFontWeight" 
            :options="fontWeightOptions" 
            class="flex-1" 
          />
        </div>
        <!-- Padding -->
        <div class="flex items-start gap-2">
          <label class="text-sm font-semibold text-slate-700 w-28 flex-shrink-0 pt-2.5">
            Padding <span class="text-[10px]">(PX)</span>
          </label>
          <div class="grid grid-cols-4 gap-5 flex-1">
            <InputFieldWithBadge
              v-model="inputPaddingTop"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
            <InputFieldWithBadge
              v-model="inputPaddingRight"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
            <InputFieldWithBadge
              v-model="inputPaddingBottom"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
            <InputFieldWithBadge
              v-model="inputPaddingLeft"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
          </div>
        </div>

        <!-- Margin -->
        <div class="flex items-start gap-2">
          <label class="text-sm font-semibold text-slate-700 w-28 flex-shrink-0 pt-2.5">
            Margin <span class="text-[10px]">(PX)</span>
          </label>
          <div class="grid grid-cols-4 gap-5 flex-1">
            <InputFieldWithBadge
              v-model="inputMarginTop"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
            <InputFieldWithBadge
              v-model="inputMarginRight"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1717 11L10.8077 5.63602L12.2219 4.2218L20 12L12.2219 19.7782L10.8077 18.364L16.1717 13H4V11H16.1717Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
            <InputFieldWithBadge
              v-model="inputMarginBottom"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0001 16.1716L5.63614 10.8076L4.22192 12.2218L12.0001 20L19.7783 12.2218L18.3641 10.8076L13.0001 16.1716V4H11.0001V16.1716Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
            <InputFieldWithBadge
              v-model="inputMarginLeft"
              type="number"
              badge='<svg class="w-3.5 h-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 11H20V13H7.82843L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.2218L13.1924 5.63602L7.82843 11Z"></path></svg>'
              width="full"
              labelPosition="bottom"
              :min="0"
            />
          </div>
        </div>
        <!-- Border Style -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-gray-700 w-28 flex-shrink-0">Border Style</label>
          <SelectField 
            v-model="inputBorderStyle" 
            :options="borderStyleOptions" 
            class="flex-1" 
          />
        </div>
        <!-- Row: Border Width & Border Radius (2 columns) -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Border Width -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Border Width</label>
          <InputFieldWithBadge
            v-model="inputBorderWidth"
            type="number"
            badge="PX"
            width="full"
            :min="0"
          />
        </div>

        <!-- Border Radius -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Border Radius</label>
          <InputFieldWithBadge
            v-model="inputBorderRadius"
            type="number"
            badge="PX"
            width="full"
            :min="0"
          />
        </div>
      </div>
      <!-- Row 1: Background Color & Text Color (2 columns) -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Background Color -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Background Color</label>
            <div class="flex items-center gap-1.5">
              <InputColorPicker v-model="inputBgColor" />
            </div>
          </div>

          <!-- Text Color -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Text Color</label>
            <div class="flex items-center gap-1.5">
              <InputColorPicker v-model="inputTextColor" />
            </div>
          </div>
        </div>

          <!-- Row 2: Border Color & Placeholder Color (2 columns) -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Border Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Border Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="inputBorderColor" />
              </div>
            </div>

            <!-- Placeholder Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Placeholder Color</label>
              <div class="flex items-center gap-1.5">
                <InputColorPicker v-model="inputPlaceholderColor" />
              </div>
            </div>
          </div>
      </div>
    </div>


    </section>

    <!-- Right Panel: Live Form Preview Box (Col-span-6) -->
    <section class="lg:col-span-6 bg-slate-100/50 border border-slate-200/60 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
      <div class="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center min-h-[300px] flex items-center justify-center text-slate-400 text-xs">
        Right Panel 
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Declare props to receive the active state from the parent
const props = defineProps({
  active: Boolean
});

// Reactive form info bindings
const formTitle = ref("");
const formDescription = ref("");

// Collapsible state
const isLabelStyleOpen = ref(false);

// Custom styles states
const textColor = ref("#1e293b");
const fontSize = ref(12);
const fontWeight = ref("500");

// Label display toggle state (using "show" / "hide" strings)
const showLabel = ref("show");

// Options for the RadioTypeSelector component
const displayOptions = [
  { label: "Show", value: "show" },
  { label: "Hide", value: "hide" }
];

// Ref for the TextareaField component
const textareaRef = ref<any>(null);


const fontWeightOptions = {
  "300": "Light",
  "400": "Regular",
  "500": "Medium",
  "700": "Bold"
};

// Input collapsible state
const isInputStyleOpen = ref(false);

// Input styling states with default values matching the screenshots
const inputWidth = ref("100%");
const inputSize = ref("default");
const inputBgColor = ref("#ffffff");
const inputTextColor = ref("#1e293b");
const inputBorderColor = ref("#cccccc");
const inputBorderWidth = ref(1);
const inputBoxShadow = ref("0 0 0 #000000");
const inputPlaceholderColor = ref("#5f6368");
const inputBorderStyle = ref("solid");
const inputFontSize = ref(14);
const inputFontWeight = ref("400");
const inputBorderRadius = ref(4);
// Directional padding states (in pixels)
const inputPaddingTop = ref(10);
const inputPaddingRight = ref(10);
const inputPaddingBottom = ref(10);
const inputPaddingLeft = ref(10);

// Directional margin states (in pixels)
const inputMarginTop = ref(0);
const inputMarginRight = ref(0);
const inputMarginBottom = ref(0);
const inputMarginLeft = ref(0);

// Options matching the dropdown lists in the screenshots
const fieldWidthOptions = {
  "100%": "100% Default",
  "tiny": "Tiny",
  "small": "Small",
  "medium": "Medium",
  "large": "Large"
};

const fieldSizeOptions = {
  "default": "Default",
  "small": "Small",
  "large": "Large"
};

const borderStyleOptions = {
  "none": "None",
  "solid": "Solid",
  "dotted": "Dotted",
  "dashed": "Dashed"
};

// Watch the active prop and trigger focus when the step becomes active
watch(
  () => props.active,
  (isActive) => {
    if (isActive) {
      setTimeout(() => {
        textareaRef.value?.focus();
      }, 150); // 150ms delay allows v-show to display the element before focusing
    }
  },
  { immediate: true }
);
</script>
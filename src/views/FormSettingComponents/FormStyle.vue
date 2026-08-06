<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
    <!-- Left Panel: Customization Settings (Col-span-6) -->
    <section class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      
      <!-- Form Information Card -->
      <div class="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        <h4 class="text-sm font-semibold text-slate-800 mb-2">Form Information</h4>
        <!-- Global InputField Component -->
        <InputField
          v-model="formTitle"
          label="Form Title"
          type="text"
          focusColor="teal"
          placeholder="Enter form title..."
        />
        <!-- Global TextareaField Component -->
        <TextareaField
          ref="textareaRef"
          v-model="formDescription"
          label="Form Description"
          :rows="2"
          textareaClass="!h-20 resize-none"
          placeholder="Enter form description..."
        />
      </div>

      <!-- Collapsible Label Style Card -->
      <div class="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <button 
          @click="isLabelStyleOpen = !isLabelStyleOpen"
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-sm font-medium text-slate-700 cursor-pointer transition-colors"
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

        <div v-show="isLabelStyleOpen" class="p-4 space-y-3 bg-white">
          <!-- Text Color -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-600 w-28 flex-shrink-0">Text Color</label>
          <!-- Custom Swatch + Chrome Picker -->
          <InputColorPicker v-model="textColor" />
          <!-- Synchronized Hex Text Input -->
          <input 
            v-model="textColor"
            class="flex-1 px-2 py-1 rounded border border-slate-200 text-xs text-slate-700 font-mono focus:outline-none focus:ring-1 focus:ring-teal-700/20 focus:border-teal-700" 
            type="text" 
          />
        </div>

          <!-- Font Size -->
          <div class="flex items-center gap-2">
            <label class="text-xs text-slate-600 w-28 flex-shrink-0">Font Size</label>
            <select 
              v-model="fontSize"
              class="flex-1 px-2 py-1.5 rounded border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700/20 focus:border-teal-700 cursor-pointer"
            >
              <option value="12px">12px</option>
              <option value="13px">13px</option>
              <option value="14px">14px</option>
              <option value="15px">15px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
            </select>
          </div>

          <!-- Font Weight -->
          <div class="flex items-center gap-2">
            <label class="text-xs text-slate-600 w-28 flex-shrink-0">Font Weight</label>
            <select 
              v-model="fontWeight"
              class="flex-1 px-2 py-1.5 rounded border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700/20 focus:border-teal-700 cursor-pointer"
            >
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
            </select>
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
const formTitle = ref("Untitled Form");
const formDescription = ref("");

// Collapsible state
const isLabelStyleOpen = ref(true);

// Custom styles states
const textColor = ref("#1e293b");
const fontSize = ref("12px");
const fontWeight = ref("500");

// Ref for the TextareaField component
const textareaRef = ref<any>(null);

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
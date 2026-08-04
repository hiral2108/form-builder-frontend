<template>
  <div class="min-h-screen bg-slate-50/50 flex flex-col">

    <!-- Header Controls -->
    <header class="fixed top-0 left-0 w-full bg-white z-38 lg:pl-20 pl-0 h-16 flex items-center">
      <div class="w-full px-6 flex items-center justify-between">
        <!-- Brand & Form Title -->
        <div class="flex items-center gap-4">
          <router-link to="/dashboard" class="text-slate-400 hover:text-slate-600 flex items-center gap-1">
            <i class="ri-arrow-left-line text-lg"></i>
          </router-link>
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 text-lg">Back to List</span>

          </div>
        </div>
        <!-- Next/Prev & Save Buttons -->
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            @click="prevStep" 
            :disabled="currentStep === 1"
            class="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="ri-arrow-left-s-line"></i> Back
          </button>
          <button 
            type="button" 
            @click="nextStep" 
            :disabled="currentStep === 4"
            class="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <i class="ri-arrow-right-s-line"></i>
          </button>
          
          <button 
            type="button"
            class="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-sm transition-all shadow-md shadow-teal-600/10 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </header>

    <!-- Sub-Navbar Navigation Steps -->
    <div class="sticky top-0 z-[48] lg:pl-20 pl-0">
      <div class="max-w-7xl mx-auto px-6">
        <nav class="flex gap-8">
          <button 
            v-for="step in steps" 
            :key="step.number"
            @click="currentStep = step.number"
            class="py-4 border-b-2 font-medium text-sm transition-all cursor-pointer whitespace-nowrap"
            :class="currentStep === step.number ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
          >
            {{ step.number }}. {{ step.title }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="flex-1 lg:pl-20 pl-0 pt-6 px-6 max-w-7xl mx-auto w-full pb-12">
      
      <!-- STEP 1: FORM FIELDS BUILDER -->
      <div v-show="currentStep === 1" class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
        <!-- Left: Field Library -->
        <section class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 class="font-semibold text-slate-800 text-sm mb-4 tracking-tight">Field Library</h3>
          <div class="grid grid-cols-1 gap-2">
            <button 
              v-for="item in fieldLibrary" 
              :key="item.type"
              class="w-full flex items-center gap-3 px-4 py-3 border border-slate-100 hover:border-teal-500 hover:bg-teal-50/10 rounded-xl text-left text-sm text-slate-700 font-medium transition-all cursor-pointer group"
            >
              <div class="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-teal-100/50 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-colors">
                <i :class="item.icon" class="text-base"></i>
              </div>
              {{ item.label }}
            </button>
          </div>
        </section>

        <!-- Center: Live Form Preview -->
        <section class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <h3 class="font-semibold text-slate-800 text-sm">Form Preview</h3>
            <span class="text-xs text-slate-400 font-medium">Click on a field to edit it</span>
          </div>
          <div class="p-8">
            <form @submit.prevent class="space-y-5">
              <!-- Text Input Field (Selected) -->
              <div class="p-4 border rounded-xl relative cursor-pointer border-teal-500 bg-teal-50/10 ring-2 ring-teal-500/20">
                <div class="absolute right-3 top-3 flex items-center gap-1.5">
                  <button class="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                    <i class="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-slate-700">Text Input</label>
                  <input disabled type="text" placeholder="Enter text" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400" />
                </div>
              </div>

              <!-- Email Field -->
              <div class="p-4 border rounded-xl relative cursor-pointer border-slate-100 hover:border-slate-200">
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-slate-700">Email <span class="text-red-500">*</span></label>
                  <input disabled type="text" placeholder="Email Address" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400" />
                </div>
              </div>

              <!-- Textarea Field -->
              <div class="p-4 border rounded-xl relative cursor-pointer border-slate-100 hover:border-slate-200">
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-slate-700">Textarea</label>
                  <textarea disabled rows="3" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400"></textarea>
                </div>
              </div>

              <!-- Submit button -->
              <button disabled type="button" class="w-full py-3 bg-teal-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center">
                Submit
              </button>
            </form>
          </div>
        </section>

        <!-- Right: Field Settings Panel -->
        <section class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 class="font-semibold text-slate-800 text-sm mb-4 tracking-tight">Field Settings</h3>
          
          <div class="space-y-4">
            <!-- Label editor -->
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Field Label</label>
              <input type="text" value="Text Input" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
            </div>

            <!-- Placeholder editor -->
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Placeholder</label>
              <input type="text" value="Enter text" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
            </div>

            <!-- Required Toggle -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Required Field</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            
            <button class="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg text-xs transition-colors mt-6">
              Delete Field
            </button>
          </div>
        </section>
      </div>

      <!-- STEP 2: FORM STYLES CUSTOMIZATION -->
      <div v-show="currentStep === 2" class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
        <!-- Styling sidebar -->
        <section class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 class="font-bold text-slate-800 text-base mb-4 tracking-tight">Form Styling</h3>

          <!-- Theme presets -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Theme Color</label>
            <div class="flex gap-2.5">
              <button 
                v-for="color in themeColors" 
                :key="color.value"
                class="w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center text-white"
                :style="{ backgroundColor: color.value }"
                :class="color.value === '#0f766e' ? 'border-slate-800 scale-110 shadow-sm' : 'border-transparent hover:scale-105'"
              >
                <i v-if="color.value === '#0f766e'" class="ri-check-line text-xs font-bold"></i>
              </button>
            </div>
          </div>

          <!-- Border style -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Border Roundness</label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="round in roundingOptions" 
                :key="round.value"
                class="py-2 px-3 border text-xs font-medium rounded-lg transition-all cursor-pointer"
                :class="round.value === 'rounded-lg' ? 'border-teal-600 bg-teal-50/10 text-teal-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
              >
                {{ round.label }}
              </button>
            </div>
          </div>

          <!-- Padding density -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Form Padding</label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="pad in paddingOptions" 
                :key="pad.value"
                class="py-2 px-3 border text-xs font-medium rounded-lg transition-all cursor-pointer"
                :class="pad.value === 'p-8' ? 'border-teal-600 bg-teal-50/10 text-teal-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
              >
                {{ pad.label }}
              </button>
            </div>
          </div>
        </section>

        <!-- Large form preview panel -->
        <section class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-12 flex justify-center bg-slate-50/50">
          <div class="w-full max-w-lg bg-white border border-slate-200 shadow-xl rounded-xl p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-slate-800">Customized Form View</h2>
              <p class="text-slate-500 text-xs mt-1">This layout demonstrates styling application</p>
            </div>
            <div class="space-y-4">
              <div class="space-y-1">
                <span class="text-xs font-semibold text-slate-700">Sample Text Field</span>
                <input disabled type="text" placeholder="Theme color preview" class="w-full px-4 py-2 border border-slate-200 text-sm rounded-lg" />
              </div>
              <button disabled type="button" class="w-full py-3 bg-teal-700 text-white font-semibold text-sm rounded-xl">
                Submit Button
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- STEP 3: DISPLAY RULES -->
      <div v-show="currentStep === 3" class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <h3 class="font-bold text-slate-800 text-base tracking-tight mb-4">Display & Targeting Rules</h3>
        
        <!-- Timing trigger -->
        <div class="space-y-3 pb-6 border-b border-slate-100">
          <span class="block text-sm font-semibold text-slate-700">When to display the form?</span>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="trigger" value="load" checked class="text-teal-600" />
              <span class="text-sm text-slate-600">On Page Load</span>
            </label>
            <div class="pl-6 flex items-center gap-2">
              <span class="text-xs text-slate-500">Show after</span>
              <input type="number" value="2" class="w-16 px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none" />
              <span class="text-xs text-slate-500">seconds</span>
            </div>

            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="trigger" value="scroll" class="text-teal-600" />
              <span class="text-sm text-slate-600">When user scrolls page</span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="trigger" value="exit" class="text-teal-600" />
              <span class="text-sm text-slate-600">Exit Intent (when user tries to leave the page)</span>
            </label>
          </div>
        </div>

        <!-- Device targeting -->
        <div class="space-y-3">
          <span class="block text-sm font-semibold text-slate-700">Target Devices</span>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="device in deviceOptions"
              :key="device.value"
              class="py-3 px-4 border text-xs font-semibold rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2"
              :class="device.value === 'all' ? 'border-teal-600 bg-teal-50/10 text-teal-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
            >
              <i :class="device.icon" class="text-lg"></i>
              {{ device.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- STEP 4: MESSAGE & NOTIFICATIONS -->
      <div v-show="currentStep === 4" class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <h3 class="font-bold text-slate-800 text-base tracking-tight mb-4">Submission Settings</h3>

        <!-- Success Message -->
        <div class="space-y-2 pb-6 border-b border-slate-100">
          <label class="block text-sm font-semibold text-slate-700">Confirmation Message</label>
          <p class="text-xs text-slate-400">Shown to the user immediately after submitting the form.</p>
          <textarea 
            rows="4" 
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >Thank you! Your submission has been received successfully.</textarea>
        </div>

        <!-- Admin Alerts -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-sm font-semibold text-slate-700">Email Notifications</span>
              <p class="text-xs text-slate-400">Receive an email alert each time a user submits a form response.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer" />
              <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div class="space-y-1.5 pt-2">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination Email</label>
            <input 
              type="email" 
              value="john@example.com"
              class="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
            />
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Local States
const formName = ref('fhg');
const currentStep = ref(1);

const steps = [
  { number: 1, title: 'Form Fields' },
  { number: 2, title: 'Form Styles' },
  { number: 3, title: 'Display Rules' },
  { number: 4, title: 'Message & Notifications' }
];

const fieldLibrary = [
  { type: 'text', label: 'Text Input', icon: 'ri-text' },
  { type: 'name', label: 'Name', icon: 'ri-user-line' },
  { type: 'email', label: 'Email', icon: 'ri-mail-line' },
  { type: 'phone', label: 'Phone/Number', icon: 'ri-phone-line' },
  { type: 'textarea', label: 'Textarea', icon: 'ri-text-wrap' },
  { type: 'dropdown', label: 'Dropdown', icon: 'ri-arrow-down-s-line' },
  { type: 'radio', label: 'Radio Buttons', icon: 'ri-radio-button-line' },
  { type: 'checkboxes', label: 'Checkboxes', icon: 'ri-checkbox-line' },
  { type: 'datepicker', label: 'Date Picker', icon: 'ri-calendar-line' },
  { type: 'timepicker', label: 'Time Picker', icon: 'ri-time-line' },
  { type: 'fileupload', label: 'File Upload', icon: 'ri-upload-2-line' }
];

// Navigation Steps
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++;
};

// Design Options configs
const themeColors = [
  { value: '#0f766e' }, // Teal
  { value: '#2563eb' }, // Blue
  { value: '#4f46e5' }, // Indigo
  { value: '#7c3aed' }, // Purple
  { value: '#ea580c' }, // Orange
  { value: '#1e293b' }  // Dark slate
];

const roundingOptions = [
  { label: 'Sharp', value: 'rounded-none' },
  { label: 'Medium', value: 'rounded-lg' },
  { label: 'Large', value: 'rounded-2xl' }
];

const paddingOptions = [
  { label: 'Compact', value: 'p-4' },
  { label: 'Standard', value: 'p-8' },
  { label: 'Spacious', value: 'p-12' }
];

const deviceOptions = [
  { label: 'All Devices', value: 'all', icon: 'ri-responsive-line' },
  { label: 'Desktop Only', value: 'desktop', icon: 'ri-computer-line' },
  { label: 'Mobile Only', value: 'mobile', icon: 'ri-phone-line' }
];
</script>


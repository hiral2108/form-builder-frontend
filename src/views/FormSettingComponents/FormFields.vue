<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
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
</template>

<script setup lang="ts">
  const fieldLibrary = [
    { type: "text", label: "Text Input", icon: "ri-text" },
    { type: "name", label: "Name", icon: "ri-user-line" },
    { type: "email", label: "Email", icon: "ri-mail-line" },
    { type: "phone", label: "Phone/Number", icon: "ri-phone-line" },
    { type: "textarea", label: "Textarea", icon: "ri-text-wrap" },
    { type: "dropdown", label: "Dropdown", icon: "ri-arrow-down-s-line" },
    { type: "radio", label: "Radio Buttons", icon: "ri-radio-button-line" },
    { type: "checkboxes", label: "Checkboxes", icon: "ri-checkbox-line" },
    { type: "datepicker", label: "Date Picker", icon: "ri-calendar-line" },
    { type: "timepicker", label: "Time Picker", icon: "ri-time-line" },
    { type: "fileupload", label: "File Upload", icon: "ri-upload-2-line" },
  ];
</script>
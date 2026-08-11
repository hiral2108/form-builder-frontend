<template>
  <div class="h-auto bg-slate-50/50 flex flex-col overflow-visible">
    <header
      class="fixed top-0 left-0 w-full bg-white z-38 h-18 flex items-center px-4 lg:px-6 transition-all duration-300 ease-in-out"
      :class="isCollapsible ? 'lg:pl-20' : 'lg:pl-60'">
      <div class="w-full px-4 lg:px-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <router-link
            to="/forms"
            class="inline-flex items-center text-base font-semibold text-slate-600 hover:text-teal-600 transition-all duration-150 ease-linear group">
            <span
              class="mr-1.5 flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 group-hover:bg-teal-600 transition-all duration-150 p-2">
              <img
                v-svg-inline
                src="@/assets/icons/form-settings/arrow-left-with-line.svg"
                alt="Back to List"
                class="h-full w-full stroke-current stroke-2 text-teal-700 group-hover:text-white transition-all duration-150" />
            </span>
            <span class="max-[570px]:hidden font-medium">Back to List</span>
          </router-link>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="prevStep"
            :disabled="currentStep === 1"
            class="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="flex items-center justify-center">
              <img v-svg-inline src="@/assets/icons/settingpage/arrow-left-s-line.svg" alt="Back" class="w-5 h-5" />
            </span>
            <span class="max-[570px]:hidden font-medium">Back</span>
          </button>
          <button
            type="button"
            @click="nextStep"
            :disabled="currentStep === 5"
            class="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="max-[570px]:hidden font-medium">Next</span>
            <span class="flex items-center justify-center">
              <img v-svg-inline src="@/assets/icons/settingpage/arrow-right-s-line.svg" alt="Next" class="w-5 h-5" />
            </span>
          </button>

          <div class="relative">
            <div class="inline-flex rounded-lg overflow-hidden bg-teal-600 shadow-md">
              <button
                type="button"
                @click="isRedirectToDashboard = false"
                class="text-white hover:bg-teal-700 cursor-pointer transition-colors flex items-center save-changes px-4 py-2 font-semibold text-sm">
                <span class="flex items-center gap-2">
                  <span class="max-[420px]:hidden">Save Changes</span>
                  <span class="min-[420px]:hidden">Save</span>
                  <ButtonLoader v-if="isLoading && isRedirectToDashboard === false" />
                </span>
              </button>

              <button
                type="button"
                @click.stop="toggleSaveDropdown"
                class="px-3 py-2 border-l border-teal-500 flex items-center justify-center hover:bg-teal-700 cursor-pointer save-dropdown-icon">
                <img
                  v-svg-inline
                  src="@/assets/icons/form-settings/arrow-down-s-line.svg"
                  alt="Save button dropdown"
                  class="w-5 h-5 text-white" />
              </button>
            </div>

            <div
              class="dropdown-content absolute right-0 top-full shadow-lg bg-white border border-gray-200 rounded-lg text-center w-max mt-1 z-50"
              v-show="showSaveDropdown">
              <button
                type="button"
                @click="isRedirectToDashboard = true"
                class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer w-full text-left">
                Save &amp; View Dashboard
                <ButtonLoader
                  v-if="isLoading && isRedirectToDashboard === true"
                  :classes="['border-gray-700! border-b-transparent!']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="bg-slate-50 sticky top-0 z-30 transition-all duration-300 ease-in-out">
      <div class="max-w-7xl mx-auto">
        <nav class="flex gap-2 xl:gap-8">
          <button
            v-for="step in steps"
            :key="step.number"
            @click="currentStep = step.number"
            class="p-4 border-b-2 font-semibold text-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
            :class="
              currentStep === step.number
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            ">
            <span
              class="w-8 h-8 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-sm lg:text-xs transition-all duration-150"
              :class="
                currentStep === step.number
                  ? 'bg-teal-600 text-white font-bold shadow-sm'
                  : 'bg-slate-200 text-slate-600 font-semibold'
              ">
              {{ step.number }}
            </span>
            <span class="hidden lg:inline">{{ step.title }}</span>
          </button>
        </nav>
      </div>
    </div>

    <main class="flex-1 pt-6 max-w-7xl mx-auto w-full overflow-visible">
      <FormFields v-if="currentStep === 1" />
      <FormStyle v-if="currentStep === 2" />
      <DisplayRules v-if="currentStep === 3" />
      <MessageAndNotification v-if="currentStep === 4" />
      <TriggerAndTargeting v-if="currentStep === 5" />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import FormFields from "@/views/FormSettingComponents/FormFields.vue";
  import FormStyle from "@/views/FormSettingComponents/FormStyle.vue";
  import DisplayRules from "@/views/FormSettingComponents/DisplayRules.vue";
  import MessageAndNotification from "@/views/FormSettingComponents/MessageAndNotification.vue";
  import TriggerAndTargeting from "@/views/FormSettingComponents/TriggerAndTargeting.vue";

  defineProps<{
    isCollapsible: boolean;
  }>();

  // Local States
  const currentStep = ref(1);
  const isLoading = ref(false);
  const isRedirectToDashboard = ref(false);
  const showSaveDropdown = ref(false);
  const toggleSaveDropdown = () => {
    showSaveDropdown.value = !showSaveDropdown.value;
  };

  const steps = [
    { number: 1, title: "Form Fields" },
    { number: 2, title: "Form Styles" },
    { number: 3, title: "Display Rules" },
    { number: 4, title: "Message & Notifications" },
    { number: 5, title: "Trigger Settings" },
  ];

  // Navigation Steps
  const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
  };

  const nextStep = () => {
    if (currentStep.value < 5) currentStep.value++;
  };
</script>

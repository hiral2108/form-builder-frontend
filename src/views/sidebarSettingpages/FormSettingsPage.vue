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
            :disabled="currentStep === 5 || isStepDisabled(currentStep + 1)"
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
              @click="isRedirectToDashboard = false; saveFormSettings()"
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
              @click="isRedirectToDashboard = true; saveFormSettings()"
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
            :disabled="isStepDisabled(step.number)"
            @click="!isStepDisabled(step.number) && (currentStep = step.number)"
            class="p-3 xl:p-4 border-b-2 font-semibold text-md transition-all whitespace-nowrap flex items-center gap-2"
            :class="[
              isStepDisabled(step.number)
                ? 'border-transparent text-slate-300 opacity-50 cursor-default'
                : currentStep === step.number
                  ? 'border-teal-600 text-teal-600 cursor-pointer'
                  : 'border-transparent text-slate-500 hover:text-slate-700 cursor-pointer',
            ]">
            <span
              class="w-8 h-8 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-sm lg:text-xs transition-all duration-150"
              :class="[
                isStepDisabled(step.number)
                  ? 'bg-slate-100 text-slate-400'
                  : currentStep === step.number
                    ? 'bg-teal-600 text-white font-bold shadow-sm'
                    : 'bg-slate-200 text-slate-600 font-semibold',
              ]">
              {{ step.number }}
            </span>
            <span class="hidden lg:inline">{{ step.title }}</span>
          </button>
        </nav>
      </div>
    </div>

    <main class="flex-1 pt-6 max-w-7xl mx-auto w-full overflow-visible relative min-h-[400px]">
      <!-- Premium visual spinner overlay while loading API data (only for other steps) -->
      <div v-if="isWidgetDataLoading && currentStep !== 1" class="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1.5px] z-50">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
      </div>
      
      <!-- Render FormFields step immediately, passing the loading flag as a prop -->
      <FormFields v-if="currentStep === 1" :isLoading="isWidgetDataLoading" />
      <FormStyle v-if="!isWidgetDataLoading && currentStep === 2" />
      <DisplayRules v-if="!isWidgetDataLoading && currentStep === 3" />
      <MessageAndNotification v-if="!isWidgetDataLoading && currentStep === 4" />
      <TriggerAndTargeting v-if="!isWidgetDataLoading && currentStep === 5" />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import FormFields from "@/views/FormSettingComponents/FormFields.vue";
  import FormStyle from "@/views/FormSettingComponents/FormStyle.vue";
  import DisplayRules from "@/views/FormSettingComponents/DisplayRules.vue";
  import MessageAndNotification from "@/views/FormSettingComponents/MessageAndNotification.vue";
  import TriggerAndTargeting from "@/views/FormSettingComponents/TriggerAndTargeting.vue";
  
  import FormSettingService from "@/services/api/form-setting-services";
  import { formSetting } from "@/composable/useFormSettings";
  import type { SaveWidgetSettingPayload } from "@/types/form";

  defineProps<{
    isCollapsible: boolean;
  }>();

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

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

  // Destructure Pinia stores, status loading indicators and fetch action from composable
  const {
    formFieldSetting,
    formStyleSetting,
    displayRuleSetting,
    submissionSetting,
    timeDelaySetting,
    scrollBasedSetting,
    pageRuleSetting,
    dateTimeSetting,
    dayHourSetting,
    countryTargeting,
    validationErrors,
    isWidgetDataLoading,
    fetchWidgetSetting
  } = formSetting();

  const hasVisibleFields = computed(() => {
    const fields = formFieldSetting.value?.fields || [];
    return fields.some((field: any) => field.type !== "hidden");
  });

  const isStepDisabled = (stepNumber: number) => {
    return stepNumber > 1 && !hasVisibleFields.value;
  };
  
  // Auto return to Step 1 if all fields are removed
  watch(hasVisibleFields, (hasFields) => {
    if (!hasFields && currentStep.value > 1) {
      currentStep.value = 1;
    }
  });

  // Deep color object format converter (to RGBA string)
  const convertColorsDeep = (obj: any): any => {
    if (!obj) return obj;
    if (obj instanceof Date) return obj;

    if (
      typeof obj === 'object' &&
      obj.r !== undefined &&
      obj.g !== undefined &&
      obj.b !== undefined &&
      obj.a !== undefined
    ) {
      return `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => convertColorsDeep(item));
    }

    if (typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = convertColorsDeep(obj[key]);
      }
      return newObj;
    }
    return obj;
  };

  // Deep Date object formatter (to YYYY-MM-DD)
  const formatDatesDeep = (obj: any): any => {
    if (!obj) return obj;
    if (obj instanceof Date) {
      const year = obj.getFullYear();
      const month = String(obj.getMonth() + 1).padStart(2, '0');
      const day = String(obj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => formatDatesDeep(item));
    }

    if (typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = formatDatesDeep(obj[key]);
      }
      return newObj;
    }
    return obj;
  };

  // Validation rules for triggers and targeting settings
  const validateTriggersAndTargetingSettings = (): boolean => {
    Object.keys(validationErrors).forEach((k) => delete validationErrors[k]);

    // ⏱ Time delay
    if (timeDelaySetting.value.is_time_delay === 1) {
      const seconds = timeDelaySetting.value.seconds;
      const raw = seconds as unknown as string | number | null | undefined;
      if (
        raw === null ||
        raw === undefined ||
        String(raw).trim() === "" ||
        Number.isNaN(Number(raw)) ||
        Number(raw) < 0
      ) {
        validationErrors.delay_duration = 'Delay duration must be a valid number';
      }
    }

    // 📜 Scroll trigger
    if (scrollBasedSetting.value.is_scroll_trigger === 1) {
      const scrollValue = scrollBasedSetting.value.scroll;
      const raw = scrollValue as unknown as string | number | null | undefined;
      if (
        raw === null ||
        raw === undefined ||
        String(raw).trim() === "" ||
        Number.isNaN(Number(raw)) ||
        Number(raw) < 0 ||
        Number(raw) > 100
      ) {
        validationErrors.page_scroll = 'Scroll percentage must be between 0 and 100';
      }
    }

    // 📄 Page rules
    if (pageRuleSetting.value.has_page_rule === 1) {
      pageRuleSetting.value.rule_setting.forEach((rule) => {
        if (!rule.rule_value?.trim()) {
          validationErrors[`rule_value_${rule.id}`] = 'Page rule value is required';
        }
      });
    }

    // 📅 Date & time rule
    if (dateTimeSetting.value.has_date_rule === 1) {
      dateTimeSetting.value.rule_setting.forEach((rule: any) => {
        if (!rule.start_date) {
          validationErrors[`date_rule_start_date_${rule.id}`] = 'Start date is required';
        }
        if (!rule.end_date) {
          validationErrors[`date_rule_end_date_${rule.id}`] = 'End date is required';
        }
        if (
          rule.start_date &&
          rule.end_date &&
          new Date(rule.start_date) > new Date(rule.end_date)
        ) {
          validationErrors[`date_rule_end_date_${rule.id}`] = 'End date must be after start date';
        }
      });
    }

    // If validation fails, jump to step 5 and focus on error
    if (Object.keys(validationErrors).length > 0) {
      currentStep.value = 5;
      
      nextTick(() => {
        const firstErrorKey = Object.keys(validationErrors)[0];
        if (!firstErrorKey) return;
        const el = document.getElementById(firstErrorKey);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (el as HTMLElement).focus?.();
        }
      });
      return false;
    }
    return true;
  };

  // Save Settings Submit Handler
  const saveFormSettings = async () => {
    if (!validateTriggersAndTargetingSettings()) return;

    isLoading.value = true;
    showSaveDropdown.value = false;
    
    try {
      const widgetId = String(route.params.uniqueId);

      const payload: SaveWidgetSettingPayload = {
        form_field_setting: formFieldSetting.value,
        form_style_setting: formStyleSetting.value,
        display_rule_setting: displayRuleSetting.value,
        submission_setting: submissionSetting.value,
        time_delay_setting: timeDelaySetting.value,
        scroll_based_setting: scrollBasedSetting.value,
        page_rule_setting: pageRuleSetting.value,
        date_time_setting: formatDatesDeep(dateTimeSetting.value),
        day_hour_setting: dayHourSetting.value,
        country_rule_setting: countryTargeting.value,
        widget_id: widgetId
      };

      const finalPayload = convertColorsDeep(payload);
      const response = await new FormSettingService().savePopupSetting(finalPayload);
      
      if (response.status === 1) {
        toast.success(response.message || "Settings saved successfully!");
        if (isRedirectToDashboard.value) {
          router.push("/forms");
        }
      } else {
        toast.error(response.message || "Failed to save settings");
      }
    } catch (error) {
      toast.error("Failed to save settings");
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  // Watch for Route Param Changes to trigger fetching details on mounted
  watch(
    () => route.params.uniqueId,
    (id) => {
      if (typeof id === 'string') {
        fetchWidgetSetting(id);
      }
    },
    { immediate: true }
  );

  // Navigation Steps
  const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
  };

  const nextStep = () => {
    if (currentStep.value < 5 && !isStepDisabled(currentStep.value + 1)) {
      currentStep.value++;
    }
  };
</script>

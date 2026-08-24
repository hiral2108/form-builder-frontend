import { ref, reactive, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useFormFieldSettingStore } from "@/stores/formFieldStore";
import { useFormStyleSettingStore } from "@/stores/formStyleStore";
import { useDisplayRuleSettingStore } from "@/stores/DisplayRuleStore";
import { useSubmissionSettingStore } from "@/stores/submissionStore";
import { useTimeDelaySettingStore } from "@/stores/timeDelaySetting";
import { useScrollBasedSettingStore } from "@/stores/scrollBasedSetting";
import { usePageRuleSettingStore } from "@/stores/pageRuleSetting";
import { useDateTimeSettingsStore } from "@/stores/dateTimeSettings";
import { useDayHourSettingsStore } from "@/stores/dayHourSettings";
import { useCountryTargetingStore } from "@/stores/countryTargeting";
import FormSettingService from "@/services/api/form-setting-services";

const isWidgetDataLoading = ref(true);
const validationErrors = reactive<Record<string, string>>({});

export function formSetting() {
  const FormFieldSettingStore = useFormFieldSettingStore();
  const FormStyleSettingStore = useFormStyleSettingStore();
  const DisplayRuleSettingStore = useDisplayRuleSettingStore();
  const SubmissionSettingStore = useSubmissionSettingStore();
  const TimeDelaySettingStore = useTimeDelaySettingStore();
  const ScrollBasedSettingStore = useScrollBasedSettingStore();
  const PageRuleSettingStore = usePageRuleSettingStore();
  const DateTimeSettingsStore = useDateTimeSettingsStore();
  const DayHourSettingsStore = useDayHourSettingsStore();
  const CountryTargetingStore = useCountryTargetingStore();

  const { formFieldSetting } = storeToRefs(FormFieldSettingStore);
  const { formStyleSetting } = storeToRefs(FormStyleSettingStore);
  const { displayRuleSetting } = storeToRefs(DisplayRuleSettingStore);
  const { submissionSetting } = storeToRefs(SubmissionSettingStore);
  const { timeDelaySetting } = storeToRefs(TimeDelaySettingStore);
  const { scrollBasedSetting } = storeToRefs(ScrollBasedSettingStore);
  const { pageRuleSetting } = storeToRefs(PageRuleSettingStore);
  const { dateTimeSetting } = storeToRefs(DateTimeSettingsStore);
  const { dayHourSetting } = storeToRefs(DayHourSettingsStore);
  const { countryTargeting } = storeToRefs(CountryTargetingStore);

  const resetFormStores = () => {
    FormFieldSettingStore.$reset();
    FormStyleSettingStore.$reset();
    DisplayRuleSettingStore.$reset();
    SubmissionSettingStore.$reset();
    TimeDelaySettingStore.$reset();
    ScrollBasedSettingStore.$reset();
    PageRuleSettingStore.$reset();
    DateTimeSettingsStore.$reset();
    DayHourSettingsStore.$reset();
    CountryTargetingStore.$reset();
  };

  const isEmpty = (val: any): boolean => {
    if (val == null) return true;
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "object") return Object.keys(val).length === 0;
    return false;
  };

  const withDefault = <T extends object>(value: T | null, fallback: T): T => {
    if (isEmpty(value)) {
      return structuredClone(toRaw(fallback)) as T;
    }

    const merged = structuredClone(toRaw(fallback)) as any;
    for (const key of Object.keys(value as any)) {
      const val = (value as any)[key];
      if (val !== null && val !== undefined && !isEmpty(val)) {
        merged[key] = val;
      }
    }
    return merged as T;
  };

  // Fetch form details and populate reactive Pinia stores
  const fetchWidgetSetting = async (uniqueId: string) => {
    resetFormStores();
    try {
      isWidgetDataLoading.value = true;
      if (!uniqueId) {
        throw new Error("Invalid widget id");
      }

      const response = await new FormSettingService().getWidgetSetting(uniqueId);

      if (!response || !response.data) {
        console.warn("Widget settings not found or response empty");
        return;
      }

      const data = response.data;

      // Set values with fallback protection
      formFieldSetting.value = withDefault(data.form_field_setting, FormFieldSettingStore.formFieldSetting);
      formStyleSetting.value = withDefault(data.form_style_setting, FormStyleSettingStore.formStyleSetting);
      displayRuleSetting.value = withDefault(data.display_rule_setting, DisplayRuleSettingStore.displayRuleSetting);
      submissionSetting.value = withDefault(data.submission_setting, SubmissionSettingStore.submissionSetting);
      timeDelaySetting.value = withDefault(data.time_delay_setting, TimeDelaySettingStore.timeDelaySetting);
      scrollBasedSetting.value = withDefault(data.scroll_based_setting, ScrollBasedSettingStore.scrollBasedSetting);
      pageRuleSetting.value = withDefault(data.page_rule_setting, PageRuleSettingStore.pageRuleSetting);
      dateTimeSetting.value = withDefault(data.date_time_setting, DateTimeSettingsStore.dateTimeSetting);
      dayHourSetting.value = withDefault(data.day_hour_setting, DayHourSettingsStore.dayHourSetting);
      countryTargeting.value = withDefault(data.country_rule_setting, CountryTargetingStore.countryTargeting);
    } catch (error) {
      console.error("Failed to load form details:", error);
    } finally {
      isWidgetDataLoading.value = false;
    }
  };

  const clearValidation = () => {
    Object.keys(validationErrors).forEach((k) => delete validationErrors[k]);
  };

  return {
    isWidgetDataLoading,
    formFieldSetting,
    formStyleSetting,
    clearValidation,
    resetFormStores,
    validationErrors,
    displayRuleSetting,
    submissionSetting,
    timeDelaySetting,
    scrollBasedSetting,
    pageRuleSetting,
    dateTimeSetting,
    dayHourSetting,
    countryTargeting,
    fetchWidgetSetting,
  };
}

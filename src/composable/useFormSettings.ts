import { ref, reactive } from "vue";
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

  //   const isEmpty = (val: any): boolean => {
  //     if (val == null) return true;
  //     if (Array.isArray(val)) return val.length === 0;
  //     if (typeof val === "object") return Object.keys(val).length === 0;
  //     return false;
  //   };

  //   const withDefault = <T extends object>(value: T | null, fallback: T): T => {
  //     if (isEmpty(value)) {
  //       return structuredClone(toRaw(fallback)) as T;
  //     }
  //     return value as T;
  //   };

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
  };
}

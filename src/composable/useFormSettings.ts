import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useFormFieldSettingStore } from "@/stores/formFieldStore";
import { useFormStyleSettingStore } from "@/stores/formStyleStore"

const isWidgetDataLoading = ref(true);
const validationErrors = reactive<Record<string, string>>({});

export function formSetting() {
  const FormFieldSettingStore = useFormFieldSettingStore();
  const FormStyleSettingStore = useFormStyleSettingStore();

  const { formFieldSetting } = storeToRefs(FormFieldSettingStore);
  const { formStyleSetting } = storeToRefs(FormStyleSettingStore);

  const resetFormStores = () => {
    FormFieldSettingStore.$reset();
    FormStyleSettingStore.$reset();
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
  };
}

import { defineStore } from "pinia";

export interface FormFieldType {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  labelPlacement?: "default" | "right" | "left" | "center";
  requiredMessage?: string;
  validateEmail?: number;
  emailErrorMessage?: string;
  validatePhone?: number;
  phoneErrorMessage?: string;
  rows?: number;
}

export interface FormFieldSettingType {
  fields: FormFieldType[];
  selectedFieldId: string | null;
}

export const useFormFieldSettingStore = defineStore("formFieldSetting", {
  state: () => ({
    formFieldSetting: {
      fields: [],
      selectedFieldId: null,
    } as FormFieldSettingType,
  }),
});

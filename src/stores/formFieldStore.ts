import { defineStore } from "pinia";

export interface FormFieldType {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  firstNameLabel?: string;
  firstNamePlaceholder?: string;
  lastNameLabel?: string;
  lastNamePlaceholder?: string;
  required: number;
  options?: string[];
  labelPlacement?: "left" | "center" | "right";
  nameFormat?: "single" | "split";
  requiredMessage?: string;
  validateEmail?: number;
  emailErrorMessage?: string;
  uniqueEmail?: number;
  uniqueEmailErrorMessage?: string;
  rows?: number;
  timeFormat?: "12h" | "24h";
  showPasswordIcon?: number;
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

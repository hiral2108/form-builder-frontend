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
  defaultValue?: string;
  containerClass?: string;
  fieldClass?: string;
  helpMessage?: string;
  maxLength?: number;
  firstNameRequired?: number;
  lastNameRequired?: number;
  firstNameRequiredMessage?: string;
  lastNameRequiredMessage?: string;
  firstNameContainerClass?: string;
  lastNameContainerClass?: string;
  firstNameFieldClass?: string;
  lastNameFieldClass?: string;
  firstNameDefaultValue?: string;
  lastNameDefaultValue?: string;
  firstNameMaxLength?: number;
  lastNameMaxLength?: number;
  firstNameHelpMessage?: string;
  lastNameHelpMessage?: string;
}

export interface FormFieldSettingType {
  fields: FormFieldType[];
  selectedFieldId: string | null;
  submitButtonText?: string;
  submitButtonSize?: "sm" | "md" | "lg";
  submitButtonPlacement?: "left" | "center" | "right";
  submitButtonContainerClass?: string;
  submitButtonElementClass?: string;
}

export const useFormFieldSettingStore = defineStore("formFieldSetting", {
  state: () => ({
    formFieldSetting: {
      fields: [],
      selectedFieldId: null,
      submitButtonText: "Submit",
      submitButtonSize: "lg",
      submitButtonPlacement: "center",
      submitButtonContainerClass: "",
      submitButtonElementClass: "",
    } as FormFieldSettingType,
  }),
});

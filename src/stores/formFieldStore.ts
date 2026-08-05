import { defineStore } from "pinia";

export interface FormFieldType {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

export interface FormFieldSettingType {
  fields: FormFieldType[];
  selectedFieldId: string | null;
}

export const useFormFieldSettingStore = defineStore("formFieldSetting", {
  state: () => ({
    formFieldSetting: {
      fields: [
        { id: "1", type: "text", label: "Text Input", placeholder: "Enter text", required: false },
        { id: "2", type: "email", label: "Email", placeholder: "Email Address", required: true },
        { id: "3", type: "textarea", label: "Textarea", placeholder: "Enter description...", required: false },
      ],
      selectedFieldId: "1",
    } as FormFieldSettingType,
  }),
});

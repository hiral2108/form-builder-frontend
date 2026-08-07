import { defineStore } from "pinia";

export interface FormInfoType {
  formTitle: string;
  formDescription: string;
}

export interface LabelStyleType {
  showLabel: string;
  textColor: string;
  fontSize: number;
  fontWeight: string;
}

export interface InputStyleType {
  inputWidth: string;
  inputSize: string;
  inputBgColor: string;
  inputTextColor: string;
  inputBorderColor: string;
  inputBorderWidth: number;
  inputBorderRadius: number;
  inputBoxShadowX: number;
  inputBoxShadowY: number;
  inputBoxShadowBlur: number;
  inputBoxShadowOpacity: number;
  inputBoxShadowColor: string;
  inputPlaceholderColor: string;
  inputBorderStyle: string;
  inputFontSize: number;
  inputFontWeight: string;
  inputPaddingTop: number;
  inputPaddingRight: number;
  inputPaddingBottom: number;
  inputPaddingLeft: number;
  inputMarginTop: number;
  inputMarginRight: number;
  inputMarginBottom: number;
  inputMarginLeft: number;
}

export interface ButtonStyleType {
  btnBgColor: string;
  btnTextColor: string;
  btnBorderColor: string;
  btnBorderWidth: number;
  btnBorderRadius: number;
  btnBoxShadowX: number;
  btnBoxShadowY: number;
  btnBoxShadowBlur: number;
  btnBoxShadowOpacity: number;
  btnBoxShadowColor: string;
  btnBorderStyle: string;
  btnFontSize: number;
  btnFontWeight: string;
  btnPaddingTop: number;
  btnPaddingRight: number;
  btnPaddingBottom: number;
  btnPaddingLeft: number;
  btnMarginTop: number;
  btnMarginRight: number;
  btnMarginBottom: number;
  btnMarginLeft: number;
}

export interface FormStyleType {
  formBgColor: string;
}

export interface FormTitleStyleType {
  formTitleTextColor: string;
  formTitlePaddingTop: number;
  formTitlePaddingRight: number;
  formTitlePaddingBottom: number;
  formTitlePaddingLeft: number;
  formTitleMarginTop: number;
  formTitleMarginRight: number;
  formTitleMarginBottom: number;
  formTitleMarginLeft: number;
  formTitleFontSize: number;
  formTitleAlign: string;
}

export interface FormDescStyleType {
  formDescTextColor: string;
  formDescPaddingTop: number;
  formDescPaddingRight: number;
  formDescPaddingBottom: number;
  formDescPaddingLeft: number;
  formDescMarginTop: number;
  formDescMarginRight: number;
  formDescMarginBottom: number;
  formDescMarginLeft: number;
  formDescFontSize: number;
  formDescAlign: string;
}

export interface FormStyleSettingType {
  formInfo: FormInfoType;
  labelStyle: LabelStyleType;
  inputStyle: InputStyleType;
  buttonStyle: ButtonStyleType;
  formStyle: FormStyleType;
  formTitleStyle: FormTitleStyleType;
  formDescStyle: FormDescStyleType;
}

export const useFormStyleSettingStore = defineStore("formStyleSetting", {
  state: () => ({
    formStyleSetting: {
      // Form Info
      formInfo: {
        formTitle: "Untitled Form",
        formDescription: "",
      },

      // Label Style
      labelStyle: {
        showLabel: "show",
        textColor: "#1e293b",
        fontSize: 12,
        fontWeight: "500",
      },

      // Input Style
      inputStyle: {
        inputWidth: "100%",
        inputSize: "default",
        inputBgColor: "#ffffff",
        inputTextColor: "#1e293b",
        inputBorderColor: "#cccccc",
        inputBorderWidth: 1,
        inputBorderRadius: 4,
        inputBoxShadowX: 0,
        inputBoxShadowY: 0,
        inputBoxShadowBlur: 0,
        inputBoxShadowOpacity: 20,
        inputBoxShadowColor: "#000000",
        inputPlaceholderColor: "#5f6368",
        inputBorderStyle: "solid",
        inputFontSize: 14,
        inputFontWeight: "400",
        inputPaddingTop: 10,
        inputPaddingRight: 10,
        inputPaddingBottom: 10,
        inputPaddingLeft: 10,
        inputMarginTop: 0,
        inputMarginRight: 0,
        inputMarginBottom: 0,
        inputMarginLeft: 0,
      },

      // Button Style
      buttonStyle: {
        btnBgColor: "#0d9488",
        btnTextColor: "#ffffff",
        btnBorderColor: "#cbd5e1",
        btnBorderWidth: 0,
        btnBorderRadius: 8,
        btnBoxShadowX: 0,
        btnBoxShadowY: 0,
        btnBoxShadowBlur: 0,
        btnBoxShadowOpacity: 20,
        btnBoxShadowColor: "#000000",
        btnBorderStyle: "none",
        btnFontSize: 14,
        btnFontWeight: "500",
        btnPaddingTop: 10,
        btnPaddingRight: 20,
        btnPaddingBottom: 10,
        btnPaddingLeft: 20,
        btnMarginTop: 10,
        btnMarginRight: 0,
        btnMarginBottom: 10,
        btnMarginLeft: 0,
      },

      // Form Style
      formStyle: {
        formBgColor: "#ffffff",
      },

      // Form Title Style
      formTitleStyle: {
        formTitleTextColor: "#1e293b",
        formTitlePaddingTop: 0,
        formTitlePaddingRight: 0,
        formTitlePaddingBottom: 0,
        formTitlePaddingLeft: 0,
        formTitleMarginTop: 0,
        formTitleMarginRight: 0,
        formTitleMarginBottom: 10,
        formTitleMarginLeft: 0,
        formTitleFontSize: 16,
        formTitleAlign: "left",
      },

      // Form Description Style
      formDescStyle: {
        formDescTextColor: "#5f6368",
        formDescPaddingTop: 0,
        formDescPaddingRight: 0,
        formDescPaddingBottom: 0,
        formDescPaddingLeft: 0,
        formDescMarginTop: 0,
        formDescMarginRight: 0,
        formDescMarginBottom: 20,
        formDescMarginLeft: 0,
        formDescFontSize: 14,
        formDescAlign: "left",
      },
    } as FormStyleSettingType,
  }),
});
import { computed } from "vue";
import { formSetting } from "@/composable/useFormSettings";

// Translate dropdown VALUES (from formStyleOptions.ts) → real CSS values
const fontWeightMap: Record<string, string> = {
  light: "300",
  regular: "400",
  medium: "700",
  bold: "700", // "Bold" also maps to 700 (adjust to 800/900 if you want it heavier than Medium)
};

const fieldWidthMap: Record<string, string> = {
  "100%": "100%",
  tiny: "150px",
  small: "200px",
  medium: "300px",
  large: "400px",
};

const fieldSizeMap: Record<string, string> = {
  small: "29px",
  large: "46px",
  // "default" has no entry on purpose — handled below with "auto"
};

export function useFormStyle() {
  const { formStyleSetting } = formSetting();

  const cssVars = computed(() => {
    const fs = formStyleSetting.value.formStyle;
    const label = formStyleSetting.value.labelStyle;
    const input = formStyleSetting.value.inputStyle;
    const btn = formStyleSetting.value.buttonStyle;

    const inputShadow = `${input.inputBoxShadowX || 0}px ${input.inputBoxShadowY || 0}px ${input.inputBoxShadowBlur || 0}px rgba(0,0,0,${(input.inputBoxShadowOpacity || 20) / 100})`;
    const btnShadow = `${btn.btnBoxShadowX || 0}px ${btn.btnBoxShadowY || 0}px ${btn.btnBoxShadowBlur || 0}px rgba(0,0,0,${(btn.btnBoxShadowOpacity || 20) / 100})`;

    const widthStyle = fieldWidthMap[input.inputWidth] || "100%";
    const heightStyle = fieldSizeMap[input.inputSize] || "auto";

    return {
      "--form-bg-color": fs.formBgColor || "#FFFFFF",

      "--label-color": label.textColor || "#1E293B",
      "--label-font-size": `${label.fontSize || 12}px`,
      "--label-font-weight": fontWeightMap[label.fontWeight] || "400",

      "--input-width": widthStyle,
      "--input-height": heightStyle,
      "--input-bg-color": input.inputBgColor || "#FFFFFF",
      "--input-text-color": input.inputTextColor || "#1E293B",
      "--input-border-color": input.inputBorderColor || "#CCCCCC",
      "--input-border-width": `${input.inputBorderWidth || 1}px`,
      "--input-border-radius": `${input.inputBorderRadius || 4}px`,
      "--input-border-style": input.inputBorderStyle || "solid",
      "--input-font-size": `${input.inputFontSize || 14}px`,
      "--input-font-weight": fontWeightMap[input.inputFontWeight] || "400",
      "--input-box-shadow": inputShadow,
      "--input-padding-top": `${input.inputPaddingTop || 10}px`,
      "--input-padding-right": `${input.inputPaddingRight || 10}px`,
      "--input-padding-bottom": `${input.inputPaddingBottom || 10}px`,
      "--input-padding-left": `${input.inputPaddingLeft || 10}px`,
      "--input-margin-top": `${input.inputMarginTop || 0}px`,
      "--input-margin-right": `${input.inputMarginRight || 0}px`,
      "--input-margin-bottom": `${input.inputMarginBottom || 0}px`,
      "--input-margin-left": `${input.inputMarginLeft || 0}px`,
      "--input-placeholder-color": input.inputPlaceholderColor || "#5F6368",

      "--button-bg-color": btn.btnBgColor || "#0D9488",
      "--button-text-color": btn.btnTextColor || "#FFFFFF",
      "--button-border-color": btn.btnBorderColor || "#CBD5E1",
      "--button-border-width": `${btn.btnBorderWidth || 0}px`,
      "--button-border-radius": `${btn.btnBorderRadius || 8}px`,
      "--button-border-style": btn.btnBorderStyle || "none",
      "--button-font-size": `${btn.btnFontSize || 14}px`,
      "--button-font-weight": fontWeightMap[btn.btnFontWeight] || "500",
      "--button-box-shadow": btnShadow,
      "--button-padding-top": `${btn.btnPaddingTop || 10}px`,
      "--button-padding-right": `${btn.btnPaddingRight || 20}px`,
      "--button-padding-bottom": `${btn.btnPaddingBottom || 10}px`,
      "--button-padding-left": `${btn.btnPaddingLeft || 20}px`,
      "--button-margin-top": `${btn.btnMarginTop || 10}px`,
      "--button-margin-right": `${btn.btnMarginRight || 0}px`,
      "--button-margin-bottom": `${btn.btnMarginBottom || 10}px`,
      "--button-margin-left": `${btn.btnMarginLeft || 0}px`,
    };
  });

  return { cssVars };
}
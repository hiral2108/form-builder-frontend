import { computed } from "vue";
import { formSetting } from "@/composable/useFormSettings";

const fontWeightMap: Record<string, string> = {
  light: "300",
  regular: "400",
  medium: "500",
  bold: "700",
};

const fieldWidthMap: Record<string, string> = {
  "100%": "100%",
  tiny: "55%",
  small: "70%",
  medium: "85%",
  large: "95%",
};

const fieldSizeMap: Record<string, string> = {
  small: "29px",
  large: "46px",
};

const ctaButtonSizeMap: Record<string, string> = {
  "45": "45px",
  "54": "54px",
  "63": "63px",
  "72": "72px",
  "81": "81px",
  "91": "91px",
  "100": "100px",
};

// Helper function to convert HEX color & opacity % to rgba CSS string
const hexToRgba = (hex: string, opacity: number) => {
  let c = (hex || "#000000").replace("#", "");
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${(opacity ?? 20) / 100})`;
};

export function useFormStyle() {
  const { formStyleSetting, displayRuleSetting } = formSetting();

  const cssVars = computed(() => {
    const fs = formStyleSetting.value.formStyle;
    const label = formStyleSetting.value.labelStyle;
    const input = formStyleSetting.value.inputStyle;
    const btn = formStyleSetting.value.buttonStyle;
    const display = displayRuleSetting.value;

    const inputShadow = `${input.inputBoxShadowX ?? 0}px ${input.inputBoxShadowY ?? 0}px ${input.inputBoxShadowBlur ?? 0}px ${hexToRgba(input.inputBoxShadowColor, input.inputBoxShadowOpacity)}`;
    const btnShadow = `${btn.btnBoxShadowX ?? 0}px ${btn.btnBoxShadowY ?? 0}px ${btn.btnBoxShadowBlur ?? 0}px ${hexToRgba(btn.btnBoxShadowColor, btn.btnBoxShadowOpacity)}`;

    const widthStyle = fieldWidthMap[input.inputWidth] || "100%";
    const heightStyle = fieldSizeMap[input.inputSize] || "auto";

    const title = formStyleSetting.value.formTitleStyle || {};
    const desc = formStyleSetting.value.formDescStyle || {};

    return {
      "--form-bg-color": fs.formBgColor || "#FFFFFF",

      "--label-color": label.textColor || "#1E293B",
      "--label-font-size": `${label.fontSize ?? 12}px`,
      "--label-font-weight": fontWeightMap[label.fontWeight] || "400",

      "--input-width": widthStyle,
      "--input-height": heightStyle,
      "--input-bg-color": input.inputBgColor || "#FFFFFF",
      "--input-text-color": input.inputTextColor || "#1E293B",
      "--input-border-color": input.inputBorderColor || "#CCCCCC",
      "--input-border-width": `${input.inputBorderWidth ?? 1}px`,
      "--input-border-radius": `${input.inputBorderRadius ?? 4}px`,
      "--input-border-style": input.inputBorderStyle || "solid",
      "--input-font-size": `${input.inputFontSize ?? 14}px`,
      "--input-font-weight": fontWeightMap[input.inputFontWeight] || "400",
      "--input-box-shadow": inputShadow,
      "--input-padding-top": `${input.inputPaddingTop ?? 10}px`,
      "--input-padding-right": `${input.inputPaddingRight ?? 10}px`,
      "--input-padding-bottom": `${input.inputPaddingBottom ?? 10}px`,
      "--input-padding-left": `${input.inputPaddingLeft ?? 10}px`,
      "--input-margin-top": `${input.inputMarginTop ?? 20}px`,
      "--input-margin-right": `${input.inputMarginRight ?? 20}px`,
      "--input-margin-bottom": `${input.inputMarginBottom ?? 0}px`,
      "--input-margin-left": `${input.inputMarginLeft ?? 20}px`,
      "--input-placeholder-color": input.inputPlaceholderColor || "#5F6368",

      "--button-bg-color": btn.btnBgColor || "#0D9488",
      "--button-text-color": btn.btnTextColor || "#FFFFFF",
      "--button-border-color": btn.btnBorderColor || "#CBD5E1",
      "--button-border-width": `${btn.btnBorderWidth ?? 0}px`,
      "--button-border-radius": `${btn.btnBorderRadius ?? 8}px`,
      "--button-border-style": btn.btnBorderStyle || "none",
      "--button-font-size": `${btn.btnFontSize ?? 14}px`,
      "--button-font-weight": fontWeightMap[btn.btnFontWeight] || "500",
      "--button-box-shadow": btnShadow,
      "--button-padding-top": `${btn.btnPaddingTop ?? 10}px`,
      "--button-padding-right": `${btn.btnPaddingRight ?? 20}px`,
      "--button-padding-bottom": `${btn.btnPaddingBottom ?? 10}px`,
      "--button-padding-left": `${btn.btnPaddingLeft ?? 20}px`,
      "--button-margin-top": `${btn.btnMarginTop ?? 20}px`,
      "--button-margin-right": `${btn.btnMarginRight ?? 20}px`,
      "--button-margin-bottom": `${btn.btnMarginBottom ?? 20}px`,
      "--button-margin-left": `${btn.btnMarginLeft ?? 20}px`,

      "--widget-bg-color": display.cta_bg_color || "#0D9488",
      "--widget-text-color": display.cta_text_color || "#FFFFFF",
      "--widget-tooltip-bg-color": display.tooltip_bg_color || "#0D9488",
      "--widget-tooltip-text-color": display.tooltip_text_color || "#FFFFFF",
      "--widget-button-size":
        display.cta_icon_size === "custom"
          ? `${display.cta_custom_size ?? 54}px`
          : ctaButtonSizeMap[display.cta_icon_size] || "54px",
      "--widget-position": display.cta_icon_position === "left" ? "left" : "right",

      "--form-title-color": title.formTitleTextColor || "#1e293b",
      "--form-title-font-size": `${title.formTitleFontSize ?? 16}px`,
      "--form-title-align": title.formTitleAlign || "left",
      "--form-title-padding-top": `${title.formTitlePaddingTop ?? 0}px`,
      "--form-title-padding-right": `${title.formTitlePaddingRight ?? 0}px`,
      "--form-title-padding-bottom": `${title.formTitlePaddingBottom ?? 0}px`,
      "--form-title-padding-left": `${title.formTitlePaddingLeft ?? 0}px`,
      "--form-title-margin-top": `${title.formTitleMarginTop ?? 15}px`,
      "--form-title-margin-right": `${title.formTitleMarginRight ?? 0}px`,
      "--form-title-margin-bottom": `${title.formTitleMarginBottom ?? 0}px`,
      "--form-title-margin-left": `${title.formTitleMarginLeft ?? 20}px`,

      "--form-desc-color": desc.formDescTextColor || "#5f6368",
      "--form-desc-font-size": `${desc.formDescFontSize ?? 14}px`,
      "--form-desc-align": desc.formDescAlign || "left",
      "--form-desc-padding-top": `${desc.formDescPaddingTop ?? 0}px`,
      "--form-desc-padding-right": `${desc.formDescPaddingRight ?? 0}px`,
      "--form-desc-padding-bottom": `${desc.formDescPaddingBottom ?? 0}px`,
      "--form-desc-padding-left": `${desc.formDescPaddingLeft ?? 0}px`,
      "--form-desc-margin-top": `${desc.formDescMarginTop ?? 20}px`,
      "--form-desc-margin-right": `${desc.formDescMarginRight ?? 0}px`,
      "--form-desc-margin-bottom": `${desc.formDescMarginBottom ?? 20}px`,
      "--form-desc-margin-left": `${desc.formDescMarginLeft ?? 0}px`,
    };
  });

  return { cssVars };
}

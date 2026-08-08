import { defineStore } from "pinia";

export type DisplayRuleSettingType = {
  form_type: string;
  sticky_buttton_position: string;
  sticky_button_alignment: string;
  cta_bg_color: string;
  cta_text_color: string;
  button_text: string;
  cta_icon: string;
  cta_icon_size: string;
  cta_custom_size: string;
  cta_icon_position: string;
  attention_effect: string;
  tooltip_bg_color: string;
  tooltip_text_color: string;
};

export const useDisplayRuleSettingStore = defineStore("displayRuleSetting", {
  state: () => ({
    displayRuleSetting: {
      form_type: "sticky",
      sticky_buttton_position: "right",
      sticky_button_alignment: "middle",
      cta_bg_color: "#14b8a6",
      cta_text_color: "#ffffff",
      button_text: "Contact Us",
      cta_icon: "chat-lines",
      cta_icon_size: "54",
      cta_custom_size: "54",
      cta_icon_position: "right",
      attention_effect: "attention-none",
      tooltip_bg_color: "#14b8a6",
      tooltip_text_color: "#ffffff",
    } as DisplayRuleSettingType,
  }),
});

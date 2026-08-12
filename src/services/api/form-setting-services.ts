import { $axios } from "@/plugins/axios";
import type { SaveWidgetSettingPayload, SaveWidgetResponse } from "@/types/form.ts";

export default class FormSettingService {
  // Save form settings configuration
  savePopupSetting(payload: SaveWidgetSettingPayload): Promise<SaveWidgetResponse> {
    return $axios.post(`save_widget_setting`, payload);
  }
}
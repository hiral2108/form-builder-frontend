import { $axios } from "@/plugins/axios";
import type { SaveWidgetSettingPayload, SaveWidgetResponse, WidgetDataResponse, UploadImageResponse, RemoveImageResponse } from "@/types/form.ts";

export default class FormSettingService {
  getWidgetSetting(id: string): Promise<WidgetDataResponse> {
    return $axios.get(`get_widget_setting?widget_id=${id}`);
  }
  
  savePopupSetting(payload: SaveWidgetSettingPayload): Promise<SaveWidgetResponse> {
    return $axios.post(`save_widget_setting`, payload);
  }

  uploadImage(payload: FormData): Promise<UploadImageResponse> {
    return $axios.post(`upload_image`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  
  removeUploadedImage(payload: { image_name: string }): Promise<RemoveImageResponse> {
    return $axios.post(`remove_image`, payload);
  }
}
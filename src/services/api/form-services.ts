import { $axios } from "@/plugins/axios";
import type { NewForm, FormListResponse, WidgetStatusResponse, RenameFormResponse, RemoveFormResponse } from "@/types/form.ts";

export default class FormService {
  createForm(payload: { title: string }): Promise<NewForm> {
    return $axios.post(`create_form`, payload);
  }

  getFormsFilter(
    payload: { start_date: string; end_date: string; time: string },page: number = 1): Promise<FormListResponse> {
    return $axios.post(`get_form_list?page=${page}`, payload);
  }

  changeFormStatus(payload: { widget_id: string; widget_status: number }): Promise<WidgetStatusResponse> {
    return $axios.post(`change_widget_status`, payload);
  }

  renameFormTitle(payload: { title: string; widget_id: string }): Promise<RenameFormResponse> {
    return $axios.post(`rename_widget_title`, payload);
  }

  removeForm(payload: { widget_id: string }): Promise<RemoveFormResponse> {
    return $axios.post(`remove_widget`, payload);
  }
}
import type { FormFieldSettingType } from "@/stores/formFieldStore";
import type { FormStyleSettingType } from "@/stores/formStyleStore";
import type { DisplayRuleSettingType } from "@/stores/DisplayRuleStore";
import type { SubmissionSettingType } from "@/stores/submissionStore";
import type { TimeDelaySettingStoreType } from "@/stores/timeDelaySetting";
import type { ScrollBasedSettingStoreType } from "@/stores/scrollBasedSetting";
import type {
  PageRuleSettings,
  DateRuleSettings,
  DayHourRuleSettings,
  CountryRuleSetting,
} from "@/types/widgetSetting";

export interface NewForm {
  message: string;
  form_id: string;
}

export interface PaginatedFormList {
  data: any[];
  last_page: number;
  current_page: number;
}

export interface FormListResponse {
  widgetList: any[] | PaginatedFormList;
  totalWidget: number;
  activeWidget: number;
  inActiveWidget: number;
  message?: string;
  status?: number;
}

export interface WidgetStatusResponse {
  status: number;
  totalWidget: number;
  activeWidget: number;
  inActiveWidget: number;
  message: string;
}

export interface RenameFormResponse {
  status: number;
  message: string;
}

export interface RemoveFormResponse {
  status: number;
  message: string;
}

export interface SaveWidgetResponse {
  status: number;
  message: string;
}

export interface DashboardDataResponse {
  status: number;
  totalViews: number;
  totalClicks: number;
  dateList: string[];
  viewData: number[];
  clickData: number[];
  message?: string;
}

export interface SaveWidgetSettingPayload {
  form_field_setting: FormFieldSettingType;
  form_style_setting: FormStyleSettingType;
  display_rule_setting: DisplayRuleSettingType;
  submission_setting: SubmissionSettingType;
  time_delay_setting: TimeDelaySettingStoreType;
  scroll_based_setting: ScrollBasedSettingStoreType;
  page_rule_setting: PageRuleSettings;
  date_time_setting: DateRuleSettings;
  day_hour_setting: DayHourRuleSettings;
  country_rule_setting: CountryRuleSetting;
  widget_id: string;
}

export interface WidgetDataResponse {
  data: {
    form_field_setting: FormFieldSettingType;
    form_style_setting: FormStyleSettingType;
    display_rule_setting: DisplayRuleSettingType;
    submission_setting: SubmissionSettingType;
    time_delay_setting: TimeDelaySettingStoreType;
    scroll_based_setting: ScrollBasedSettingStoreType;
    page_rule_setting: PageRuleSettings;
    date_time_setting: DateRuleSettings;
    day_hour_setting: DayHourRuleSettings;
    country_rule_setting: CountryRuleSetting;
    widget_id?: string;
  };
}

export interface UploadImageResponse {
  status: number;
  image: string;
  fullPath: string;
  message?: string;
}

export interface RemoveImageResponse {
  status: number;
  message?: string;
}

export interface CloneWidgetResponse {
  status: number;
  message: string;
}

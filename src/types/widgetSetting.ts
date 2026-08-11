export interface PageRuleSettings {
  has_page_rule: number
  rule_setting: PageRule[]
}

export interface PageRule {
  id: string
  rule_show_hide: string
  url_rule: string
  rule_value: string
}

export interface DateRuleSettings {
  has_date_rule: number
  timezone: string
  rule_setting: DateRule[]
}

export interface DateRule {
  id: string
  start_date: Date | string | null
  end_date: Date | string | null
  start_time: string | null
  end_time: string | null
}

export interface DayTimeRule {
  start_time: string | null
  end_time: string | null
}

export interface DaySchedule {
  status: 0 | 1
  rule_setting: DayTimeRule[]
}

export interface DayHourRuleSettings {
  has_day_hour_rule: 0 | 1
  timezone: string
  time_schedule: Record<number, DaySchedule>
}

export interface CountryRuleSetting {
  has_country_rule: number
  countries: string[]
}

export interface CountryListMap {
  [code: string]: string
}